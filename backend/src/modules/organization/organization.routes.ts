import { Router, Request, Response, NextFunction } from 'express';
import organizationService from './organization.service';
import { authenticate } from '../../middlewares/auth.middleware';
import { Organization } from '../../models/organization.model';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const router = Router();

// Organization Signup
router.post('/signup', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { ownerName, ownerEmail, password, organizationName, organizationEmail, phone, website } = req.body;

    if (!ownerName || !ownerEmail || !password || !organizationName || !organizationEmail || !phone) {
      return res.status(400).json({
        success: false,
        message: 'All required fields must be provided',
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create organization with owner details
    const organization = await organizationService.createOrganization({
      name: organizationName,
      ownerId: undefined as any, // Will be set by service
      email: organizationEmail,
      phone,
      plan: 'free', // Start with free trial
      paymentStatus: 'trial',
      website,
      ownerName,
      ownerEmail,
      ownerPassword: hashedPassword,
    });

    // Generate JWT token
    const token = jwt.sign(
      { organizationId: organization._id, ownerId: organization.ownerId, email: ownerEmail },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '30d' }
    );

    res.status(201).json({
      success: true,
      message: 'Organization created successfully',
      data: {
        token,
        organizationId: organization._id,
        ownerId: organization.ownerId,
        organizationName: organization.name,
      },
    });
  } catch (error: any) {
    next(error);
  }
});

// Organization Login
router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required',
      });
    }

    // Find organization by owner email using Mongoose
    const organization = await Organization.findOne({ ownerEmail: email }).select('+ownerPassword');

    if (!organization || !organization.ownerPassword) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    // Compare password
    const isValidPassword = await bcrypt.compare(password, organization.ownerPassword);

    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { organizationId: organization._id, ownerId: organization.ownerId, email },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '30d' }
    );

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        token,
        organizationId: organization._id,
        ownerId: organization.ownerId,
        organizationName: organization.name,
      },
    });
  } catch (error: any) {
    next(error);
  }
});

// Create organization (after plan selection & payment)
router.post('/create', authenticate, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, phone, plan, paymentStatus, paymentId } = req.body;
    const ownerId = (req as any).user.id;

    if (!name || !email || !plan) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and plan are required',
      });
    }

    const organization = await organizationService.createOrganization({
      name,
      ownerId,
      email,
      phone,
      plan,
      paymentStatus: paymentStatus || 'pending',
    });

    res.status(201).json({
      success: true,
      message: 'Organization created successfully',
      data: organization,
    });
  } catch (error: any) {
    next(error);
  }
});

// Get organization (by owner)
router.get('/my-org', authenticate, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const ownerId = (req as any).user.id;

    const organization = await organizationService.getOrganizationByOwner(ownerId);

    if (!organization) {
      return res.status(404).json({
        success: false,
        message: 'Organization not found',
      });
    }

    res.status(200).json({
      success: true,
      data: organization,
    });
  } catch (error: any) {
    next(error);
  }
});

// Get organization by ID
router.get('/:organizationId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { organizationId } = req.params;
    const authHeader = req.headers.authorization;

    // Verify the token is valid (organizationToken from signup/login)
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as any;
        // Token is valid, continue
      } catch (error) {
        return res.status(401).json({
          success: false,
          message: 'Invalid token',
        });
      }
    }

    const organization = await organizationService.getOrganization(organizationId);

    if (!organization) {
      return res.status(404).json({
        success: false,
        message: 'Organization not found',
      });
    }

    res.status(200).json({
      success: true,
      data: organization,
    });
  } catch (error: any) {
    next(error);
  }
});

// Update organization
router.put('/:organizationId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { organizationId } = req.params;
    const authHeader = req.headers.authorization;

    // Verify token
    let ownerId: string | null = null;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as any;
        ownerId = decoded.ownerId;
      } catch (error) {
        return res.status(401).json({
          success: false,
          message: 'Invalid token',
        });
      }
    } else {
      return res.status(401).json({
        success: false,
        message: 'No token provided',
      });
    }

    // Verify ownership
    const organization = await organizationService.getOrganization(organizationId);
    if (!organization) {
      return res.status(404).json({
        success: false,
        message: 'Organization not found',
      });
    }

    if (organization.ownerId.toString() !== ownerId) {
      return res.status(403).json({
        success: false,
        message: 'You do not have permission to update this organization',
      });
    }

    const updated = await organizationService.updateOrganization(organizationId, req.body);

    res.status(200).json({
      success: true,
      message: 'Organization updated successfully',
      data: updated,
    });
  } catch (error: any) {
    next(error);
  }
});

// Invite instructor
router.post('/:organizationId/invite', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { organizationId } = req.params;
    const { email, role } = req.body;
    const authHeader = req.headers.authorization;

    // Verify token
    let ownerId: string | null = null;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as any;
        ownerId = decoded.ownerId;
      } catch (error) {
        return res.status(401).json({
          success: false,
          message: 'Invalid token',
        });
      }
    } else {
      return res.status(401).json({
        success: false,
        message: 'No token provided',
      });
    }

    // Verify ownership/admin status
    const organization = await organizationService.getOrganization(organizationId);
    if (!organization) {
      return res.status(404).json({
        success: false,
        message: 'Organization not found',
      });
    }

    const currentMember = organization.instructors.find(
      (i) => i.instructorId._id?.toString() === ownerId
    );

    if (!currentMember || (currentMember.role !== 'owner' && currentMember.role !== 'admin')) {
      return res.status(403).json({
        success: false,
        message: 'You do not have permission to invite instructors',
      });
    }

    if (!email || !role) {
      return res.status(400).json({
        success: false,
        message: 'Email and role are required',
      });
    }

    const result = await organizationService.inviteInstructor({
      organizationId,
      email,
      role,
    });

    res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error: any) {
    next(error);
  }
});

// Accept invitation
router.post('/:organizationId/accept-invitation', authenticate, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { organizationId } = req.params;
    const instructorId = (req as any).user.id;

    const result = await organizationService.acceptInvitation(organizationId, instructorId);

    res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error: any) {
    next(error);
  }
});

// Reject invitation
router.post('/:organizationId/reject-invitation', authenticate, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { organizationId } = req.params;
    const instructorId = (req as any).user.id;

    const result = await organizationService.rejectInvitation(organizationId, instructorId);

    res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error: any) {
    next(error);
  }
});

// Get team members
router.get('/:organizationId/team', authenticate, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { organizationId } = req.params;

    const members = await organizationService.getTeamMembers(organizationId);

    res.status(200).json({
      success: true,
      data: members,
    });
  } catch (error: any) {
    next(error);
  }
});

// Remove instructor
router.delete('/:organizationId/team/:instructorId', authenticate, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { organizationId, instructorId } = req.params;
    const ownerId = (req as any).user.id;

    // Verify ownership/admin status
    const organization = await organizationService.getOrganization(organizationId);
    if (!organization) {
      return res.status(404).json({
        success: false,
        message: 'Organization not found',
      });
    }

    const currentMember = organization.instructors.find(
      (i) => i.instructorId._id?.toString() === ownerId
    );

    if (!currentMember || (currentMember.role !== 'owner' && currentMember.role !== 'admin')) {
      return res.status(403).json({
        success: false,
        message: 'You do not have permission to manage team members',
      });
    }

    const result = await organizationService.removeInstructor(organizationId, instructorId);

    res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error: any) {
    next(error);
  }
});

export default router;
