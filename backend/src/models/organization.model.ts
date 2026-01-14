import mongoose, { Document, Schema } from 'mongoose';

export interface IOrganization extends Document {
  name: string;
  ownerId: mongoose.Types.ObjectId; // Instructor who created it
  email: string;
  phone?: string;
  description?: string;
  logo?: string;
  website?: string;
  
  // Owner Authentication
  ownerName?: string;
  ownerEmail?: string;
  ownerPassword?: string; // Hashed password for direct organization login
  
  // Plan & Payment Info
  plan: 'free' | 'starter' | 'professional' | 'enterprise';
  paymentStatus: 'pending' | 'completed' | 'failed' | 'trial';
  paymentId?: string; // Payment gateway reference
  trialEndsAt?: Date;
  
  // Team Members
  instructors: Array<{
    instructorId: mongoose.Types.ObjectId;
    role: 'owner' | 'admin' | 'instructor';
    status: 'active' | 'invited' | 'pending';
    invitedAt: Date;
    joinedAt?: Date;
  }>;
  
  // Limits based on plan
  maxInstructors: number;
  maxStudents: number;
  maxCourses: number;
  
  // Metadata
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const organizationSchema = new Schema<IOrganization>(
  {
    name: {
      type: String,
      required: [true, 'Organization name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters'],
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Instructor',
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      default: null,
    },
    description: {
      type: String,
      default: null,
    },
    logo: {
      type: String,
      default: null,
    },
    website: {
      type: String,
      default: null,
    },
    ownerName: {
      type: String,
      default: null,
    },
    ownerEmail: {
      type: String,
      default: null,
      lowercase: true,
      trim: true,
    },
    ownerPassword: {
      type: String,
      default: null,
      select: false, // Don't include password in queries by default
    },
    plan: {
      type: String,
      enum: ['free', 'starter', 'professional', 'enterprise'],
      default: 'free',
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'completed', 'failed', 'trial'],
      default: 'pending',
    },
    paymentId: {
      type: String,
      default: null,
    },
    trialEndsAt: {
      type: Date,
      default: null,
    },
    instructors: [
      {
        instructorId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Instructor',
        },
        role: {
          type: String,
          enum: ['owner', 'admin', 'instructor'],
          default: 'instructor',
        },
        status: {
          type: String,
          enum: ['active', 'invited', 'pending'],
          default: 'pending',
        },
        invitedAt: {
          type: Date,
          default: Date.now,
        },
        joinedAt: {
          type: Date,
          default: null,
        },
      },
    ],
    maxInstructors: {
      type: Number,
      default: 5,
    },
    maxStudents: {
      type: Number,
      default: 100,
    },
    maxCourses: {
      type: Number,
      default: 10,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Index for owner lookup
organizationSchema.index({ ownerId: 1 });
organizationSchema.index({ email: 1 });
organizationSchema.index({ ownerEmail: 1 });

export const Organization = mongoose.model<IOrganization>(
  'Organization',
  organizationSchema
);
