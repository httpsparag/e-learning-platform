import { Organization, IOrganization } from '../../models/organization.model';
import { Instructor } from '../../models/instructor.model';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

interface CreateOrgDTO {
  name: string;
  ownerId?: string;
  email: string;
  phone?: string;
  plan: 'free' | 'starter' | 'professional' | 'enterprise';
  paymentStatus: 'pending' | 'trial';
  website?: string;
  ownerName?: string;
  ownerEmail?: string;
  ownerPassword?: string;
}

interface InviteInstructorDTO {
  organizationId: string;
  email: string;
  role: 'admin' | 'instructor';
}

interface UpdateOrgDTO {
  name?: string;
  email?: string;
  phone?: string;
  description?: string;
  logo?: string;
  website?: string;
}

export class OrganizationService {
  // Create organization
  async createOrganization(data: CreateOrgDTO): Promise<IOrganization> {
    const { name, ownerId, email, phone, plan, paymentStatus, website, ownerName, ownerEmail, ownerPassword } = data;

    // If ownerId is not provided, create a temporary one (for standalone organization signup)
    let finalOwnerId = ownerId;
    
    if (!finalOwnerId && ownerEmail) {
      // Check if instructor exists with this email
      let instructor = await Instructor.findOne({ email: ownerEmail });
      
      if (!instructor) {
        // Create a temporary instructor for standalone organization
        const hashedPassword = await bcrypt.hash(ownerPassword || 'temporary', 10);
        instructor = await Instructor.create({
          name: ownerName || 'Organization Owner',
          email: ownerEmail,
          password: hashedPassword,
        });
      }
      
      finalOwnerId = instructor._id.toString();
    }

    // Set plan limits
    let maxInstructors = 5;
    let maxStudents = 100;
    let maxCourses = 10;

    if (plan === 'starter') {
      maxInstructors = 10;
      maxStudents = 500;
      maxCourses = 20;
    } else if (plan === 'professional') {
      maxInstructors = 50;
      maxStudents = 5000;
      maxCourses = 100;
    } else if (plan === 'enterprise') {
      maxInstructors = 999;
      maxStudents = 999999;
      maxCourses = 999;
    }

    const organization = await Organization.create({
      name,
      ownerId: new mongoose.Types.ObjectId(finalOwnerId),
      email,
      phone: phone || null,
      plan,
      paymentStatus,
      website: website || null,
      ownerName,
      ownerEmail,
      ownerPassword,
      maxInstructors,
      maxStudents,
      maxCourses,
      trialEndsAt: paymentStatus === 'trial' ? new Date(Date.now() + 14 * 24 * 60 * 60 * 1000) : null,
      instructors: [
        {
          instructorId: new mongoose.Types.ObjectId(finalOwnerId),
          role: 'owner',
          status: 'active',
          invitedAt: new Date(),
          joinedAt: new Date(),
        },
      ],
    });

    // Update instructor with organizationId
    await Instructor.findByIdAndUpdate(ownerId, { organizationId: organization._id });

    return organization;
  }

  // Get organization by ID
  async getOrganization(organizationId: string): Promise<IOrganization | null> {
    return await Organization.findById(organizationId)
      .populate('ownerId', 'name email avatar')
      .populate('instructors.instructorId', 'name email avatar');
  }

  // Get organization by owner
  async getOrganizationByOwner(ownerId: string): Promise<IOrganization | null> {
    return await Organization.findOne({ ownerId })
      .populate('ownerId', 'name email avatar')
      .populate('instructors.instructorId', 'name email avatar');
  }

  // Update organization
  async updateOrganization(organizationId: string, data: UpdateOrgDTO): Promise<IOrganization | null> {
    return await Organization.findByIdAndUpdate(organizationId, data, { new: true })
      .populate('ownerId', 'name email avatar')
      .populate('instructors.instructorId', 'name email avatar');
  }

  // Invite instructor to organization
  async inviteInstructor(data: InviteInstructorDTO): Promise<{ message: string }> {
    const { organizationId, email, role } = data;

    // Get organization
    const organization = await Organization.findById(organizationId);
    if (!organization) {
      throw new Error('Organization not found');
    }

    // Check if organization is at capacity
    if (organization.instructors.length >= organization.maxInstructors) {
      throw new Error('Organization has reached maximum instructors limit');
    }

    // Check if instructor already exists in organization
    const existingInstructor = organization.instructors.find((i) => {
      // We'll check by email after finding the instructor
      return i;
    });

    // Try to find instructor by email
    const instructor = await Instructor.findOne({ email });

    if (!instructor) {
      throw new Error('Instructor not found');
    }

    // Check if already invited
    const alreadyInvited = organization.instructors.some(
      (i) => i.instructorId.toString() === instructor._id.toString()
    );
    if (alreadyInvited) {
      throw new Error('Instructor already invited to this organization');
    }

    // Add instructor to organization
    organization.instructors.push({
      instructorId: instructor._id,
      role,
      status: 'invited',
      invitedAt: new Date(),
    });

    await organization.save();

    return { message: 'Instructor invitation sent successfully' };
  }

  // Accept invitation
  async acceptInvitation(organizationId: string, instructorId: string): Promise<{ message: string }> {
    const organization = await Organization.findById(organizationId);
    if (!organization) {
      throw new Error('Organization not found');
    }

    const invitation = organization.instructors.find(
      (i) => i.instructorId.toString() === instructorId
    );

    if (!invitation) {
      throw new Error('Invitation not found');
    }

    if (invitation.status === 'active') {
      throw new Error('Instructor is already part of this organization');
    }

    invitation.status = 'active';
    invitation.joinedAt = new Date();

    await organization.save();

    // Update instructor with organizationId
    await Instructor.findByIdAndUpdate(instructorId, { organizationId });

    return { message: 'Invitation accepted successfully' };
  }

  // Reject invitation
  async rejectInvitation(organizationId: string, instructorId: string): Promise<{ message: string }> {
    const organization = await Organization.findById(organizationId);
    if (!organization) {
      throw new Error('Organization not found');
    }

    organization.instructors = organization.instructors.filter(
      (i) => i.instructorId.toString() !== instructorId
    );

    await organization.save();

    return { message: 'Invitation rejected' };
  }

  // Get all team members
  async getTeamMembers(organizationId: string) {
    const organization = await Organization.findById(organizationId)
      .populate('instructors.instructorId', 'name email avatar');

    return organization?.instructors || [];
  }

  // Remove instructor from organization
  async removeInstructor(organizationId: string, instructorId: string): Promise<{ message: string }> {
    const organization = await Organization.findById(organizationId);
    if (!organization) {
      throw new Error('Organization not found');
    }

    // Cannot remove owner
    const instructor = organization.instructors.find(
      (i) => i.instructorId.toString() === instructorId
    );
    if (instructor?.role === 'owner') {
      throw new Error('Cannot remove organization owner');
    }

    organization.instructors = organization.instructors.filter(
      (i) => i.instructorId.toString() !== instructorId
    );

    await organization.save();

    // Update instructor to remove organization
    await Instructor.findByIdAndUpdate(instructorId, { organizationId: null });

    return { message: 'Instructor removed from organization' };
  }
}

export default new OrganizationService();
