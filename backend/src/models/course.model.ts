import mongoose, { Schema, Document } from 'mongoose';

export interface ICourse extends Document {
  title: string;
  description: string;
  videoUrl: string;
  videoPublicId: string;
  instructorId: string;
  instructorName: string;
  instructorEmail: string;
  thumbnail?: string;
  duration?: number;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  status: 'Draft' | 'Active';
  enrolledCount: number;
  capacity: number;
  rating: number;
  reviewCount: number;
  revenue: number;
  createdAt: Date;
  updatedAt: Date;
  lastUpdated: Date;
}

const courseSchema = new Schema<ICourse>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    videoUrl: {
      type: String,
      required: true,
    },
    videoPublicId: {
      type: String,
      required: true,
    },
    instructorId: {
      type: String,
      required: true,
      index: true,
    },
    instructorName: {
      type: String,
      required: true,
    },
    instructorEmail: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      default: null,
    },
    duration: {
      type: Number,
      default: 0,
    },
    level: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced'],
      default: 'Beginner',
    },
    status: {
      type: String,
      enum: ['Draft', 'Active'],
      default: 'Draft',
    },
    enrolledCount: {
      type: Number,
      default: 0,
    },
    capacity: {
      type: Number,
      default: 300,
    },
    rating: {
      type: Number,
      default: 0,
    },
    reviewCount: {
      type: Number,
      default: 0,
    },
    revenue: {
      type: Number,
      default: 0,
    },
    lastUpdated: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export const Course = mongoose.model<ICourse>('Course', courseSchema);
