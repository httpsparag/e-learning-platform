import { Organization, IOrganization } from '../../models/organization.model';
import { Instructor } from '../../models/instructor.model';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { sendEmail } from '../../utils/email';

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
  name: string;
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
    const { organizationId, name, email, role } = data;

    // Get organization
    const organization = await Organization.findById(organizationId);
    if (!organization) {
      throw new Error('Organization not found');
    }

    // Check if organization is at capacity
    if (organization.instructors.length >= organization.maxInstructors) {
      throw new Error('Organization has reached maximum instructors limit');
    }

    // Try to find instructor by email in the database
    let instructor = await Instructor.findOne({ email });

    // Check if instructor is already in this organization
    if (instructor) {
      const alreadyInvited = organization.instructors.some(
        (i) => i.instructorId.toString() === instructor._id.toString()
      );
      if (alreadyInvited) {
        throw new Error('Instructor with this email is already added to this organization');
      }
    }

    // If instructor doesn't exist, create a new instructor
    if (!instructor) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('TempPassword123!', salt);
      
      instructor = await Instructor.create({
        name: name || email.split('@')[0],
        email,
        password: hashedPassword,
        isEmailVerified: false,
        status: 'inactive',
      });
    }

    // Add instructor to organization
    organization.instructors.push({
      instructorId: instructor._id,
      role,
      status: 'invited',
      invitedAt: new Date(),
    });

    await organization.save();

    // Send invitation email
    try {
      const invitationUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/instructor/auth`;
      const emailTemplate = `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #059669; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
            .button { display: inline-block; padding: 12px 30px; background: #059669; color: white; text-decoration: none; border-radius: 8px; margin: 20px 0; }
            .credentials { background: white; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px; margin: 20px 0; }
            .credentials p { margin: 10px 0; }
            .footer { text-align: center; margin-top: 20px; color: #6b7280; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Welcome to ${organization.name}!</h1>
            </div>
            <div class="content">
              <p>Hi ${name},</p>
              <p><strong>${organization.name}</strong> has invited you to join their team as an <strong>Instructor</strong>.</p>
              
              <div class="credentials">
                <h3>Your Login Credentials:</h3>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Temporary Password:</strong> TempPassword123!</p>
                <p style="color: #dc2626; font-size: 12px;"><em>Note: Please change your password after your first login.</em></p>
              </div>
              
              <p>Click the button below to sign in and get started:</p>
              <div style="text-align: center;">
                <a href="${invitationUrl}" class="button">Sign In to Dashboard</a>
              </div>
              
              <p>If you have any questions, please contact your organization administrator.</p>
              <p>Best regards,<br><strong>EduLearn Team</strong></p>
            </div>
            <div class="footer">
              <p>© 2026 EduLearn Platform. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `;

      await sendEmail({
        to: email,
        subject: `You're invited to ${organization.name} - EduLearn Instructor Portal`,
        html: emailTemplate,
      });
    } catch (emailError) {
      console.error('Failed to send invitation email:', emailError);
      // Don't throw error - the instructor is already added, email sending is secondary
    }

    return { message: 'Instructor added successfully and invitation email sent' };
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

  // Update instructor
  async updateInstructor(
    organizationId: string,
    instructorId: string,
    data: { name?: string; email?: string }
  ): Promise<{ message: string; data: any }> {
    const organization = await Organization.findById(organizationId);
    if (!organization) {
      throw new Error('Organization not found');
    }

    // Find the instructor in the organization
    const instructor = organization.instructors.find(
      (i) => i.instructorId.toString() === instructorId
    );

    if (!instructor) {
      throw new Error('Instructor not found in this organization');
    }

    // Update instructor in database
    const updatedInstructor = await Instructor.findByIdAndUpdate(
      instructorId,
      { 
        ...(data.name && { name: data.name }),
        ...(data.email && { email: data.email })
      },
      { new: true }
    );

    if (!updatedInstructor) {
      throw new Error('Failed to update instructor');
    }

    await organization.save();

    return {
      message: 'Instructor updated successfully',
      data: updatedInstructor,
    };
  }

  // Delete instructor
  async deleteInstructor(organizationId: string, instructorId: string): Promise<{ message: string }> {
    const organization = await Organization.findById(organizationId);
    if (!organization) {
      throw new Error('Organization not found');
    }

    // Check if instructor exists in organization
    const instructor = organization.instructors.find(
      (i) => i.instructorId.toString() === instructorId
    );

    if (!instructor) {
      throw new Error('Instructor not found in this organization');
    }

    // Remove instructor from organization
    organization.instructors = organization.instructors.filter(
      (i) => i.instructorId.toString() !== instructorId
    );

    await organization.save();

    return { message: 'Instructor removed from organization successfully' };
  }
