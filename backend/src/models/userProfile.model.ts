import mongoose, { Document, Schema } from 'mongoose';

export interface IUserProfile extends Document {
  userId: mongoose.Types.ObjectId;
  phone?: string;
  location?: string;
  bio?: string;
  profession?: string;
  company?: string;
  socialLinks?: {
    linkedin?: string;
    github?: string;
    twitter?: string;
  };
  joinedDate?: Date;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

const userProfileSchema = new Schema<IUserProfile>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
      unique: true,
    },
    phone: {
      type: String,
      default: '',
      trim: true,
    },
    location: {
      type: String,
      default: '',
      trim: true,
    },
    bio: {
      type: String,
      default: '',
      trim: true,
      maxlength: [500, 'Bio cannot exceed 500 characters'],
    },
    profession: {
      type: String,
      default: '',
      trim: true,
    },
    company: {
      type: String,
      default: '',
      trim: true,
    },
    socialLinks: {
      linkedin: {
        type: String,
        default: '',
        trim: true,
      },
      github: {
        type: String,
        default: '',
        trim: true,
      },
      twitter: {
        type: String,
        default: '',
        trim: true,
      },
    },
    joinedDate: {
      type: Date,
      default: Date.now,
    },
    avatar: {
      type: String,
      default: '',
      // Removed any maxlength to allow base64 images of reasonable size
    },
  },
  {
    timestamps: true,
  }
);

export const UserProfile = mongoose.model<IUserProfile>(
  'UserProfile',
  userProfileSchema
);
