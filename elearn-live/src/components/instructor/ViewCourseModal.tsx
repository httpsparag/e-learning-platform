import React from 'react';
import { X, Play, BookOpen, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

interface ViewCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  course: any;
}

export const ViewCourseModal = ({
  isOpen,
  onClose,
  course,
}: ViewCourseModalProps) => {
  if (!isOpen || !course) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between p-6 border-b bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200">
          <h2 className="text-2xl font-bold text-gray-900">{course.title}</h2>
          <button
            onClick={onClose}
            className="p-2 transition-colors rounded-lg hover:bg-emerald-100"
          >
            <X size={24} className="text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Video Preview */}
          {course.videoUrl && (
            <div className="rounded-lg overflow-hidden bg-gray-900">
              <video
                src={course.videoUrl}
                controls
                className="w-full aspect-video bg-black"
                poster={course.thumbnail}
              />
            </div>
          )}

          {/* Course Info Grid */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <BookOpen size={18} className="text-blue-600" />
                <p className="text-sm text-gray-600">Level</p>
              </div>
              <p className="text-lg font-bold text-gray-900">{course.level}</p>
            </div>

            <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
              <div className="flex items-center gap-2 mb-2">
                <Zap size={18} className="text-emerald-600" />
                <p className="text-sm text-gray-600">Status</p>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    course.status === 'Active'
                      ? 'bg-emerald-200 text-emerald-800'
                      : 'bg-yellow-200 text-yellow-800'
                  }`}
                >
                  {course.status}
                </span>
              </div>
            </div>

            <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
              <div className="flex items-center gap-2 mb-2">
                <Play size={18} className="text-purple-600" />
                <p className="text-sm text-gray-600">Students</p>
              </div>
              <p className="text-lg font-bold text-gray-900">
                {course.enrolledCount}/{course.capacity}
              </p>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-3">Description</h3>
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {course.description}
            </p>
          </div>

          {/* Course Stats */}
          <div className="grid md:grid-cols-2 gap-6 p-6 bg-gray-50 rounded-lg">
            <div>
              <p className="text-sm text-gray-600 mb-1">Rating</p>
              <div className="flex items-baseline gap-2">
                <p className="text-3xl font-bold text-yellow-600">
                  {course.rating > 0 ? course.rating.toFixed(1) : 'N/A'}
                </p>
                <span className="text-sm text-gray-600">
                  ({course.reviewCount} reviews)
                </span>
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-600 mb-1">Revenue</p>
              <p className="text-3xl font-bold text-emerald-600">
                ${course.revenue.toFixed(2)}
              </p>
            </div>
          </div>

          {/* Instructor Info */}
          <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
            <p className="text-sm text-gray-600 mb-2">Instructor</p>
            <p className="text-lg font-semibold text-gray-900">{course.instructorName}</p>
            <p className="text-sm text-gray-600">{course.instructorEmail}</p>
          </div>

          {/* Dates */}
          <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
            <div>
              <p className="font-semibold text-gray-700 mb-1">Created</p>
              <p>{new Date(course.createdAt).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-700 mb-1">Last Updated</p>
              <p>{new Date(course.lastUpdated).toLocaleDateString()}</p>
            </div>
          </div>

          {/* Close Button */}
          <div className="pt-4 border-t border-gray-200">
            <button
              onClick={onClose}
              className="w-full px-4 py-3 font-semibold text-white transition-colors rounded-lg bg-emerald-600 hover:bg-emerald-700"
            >
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
