import React, { useState, useEffect } from 'react';
import { X, AlertCircle, CheckCircle, Trash2, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import CourseService from '../../services/course.service';

interface AdminCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  course: any;
  view: 'edit' | 'view';
  onCourseUpdated?: () => void;
  onDeleted?: () => void;
}

export const AdminCourseModal = ({
  isOpen,
  onClose,
  course,
  view,
  onCourseUpdated,
  onDeleted,
}: AdminCourseModalProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [level, setLevel] = useState('Beginner');
  const [status, setStatus] = useState('published');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (isOpen && course) {
      setTitle(course.title || '');
      setDescription(course.description || '');
      setLevel(course.level || 'Beginner');
      setStatus(course.status || 'published');
      setError('');
      setSuccess('');
    }
  }, [isOpen, course]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!title || !description) {
      setError('Please fill all required fields');
      return;
    }

    setIsSubmitting(true);
    try {
      const updateData = {
        title,
        description,
        level: level as 'Beginner' | 'Intermediate' | 'Advanced',
        status,
      };

      await CourseService.updateCourse(course._id, updateData);
      setSuccess('Course updated successfully!');

      setTimeout(() => {
        onClose();
        onCourseUpdated?.();
      }, 1500);
    } catch (err: any) {
      setError(err.message || 'Failed to update course');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this course? This action cannot be undone.')) {
      return;
    }

    setIsDeleting(true);
    setError('');
    try {
      await CourseService.deleteCourse(course._id);
      setSuccess('Course deleted successfully!');

      setTimeout(() => {
        onClose();
        onDeleted?.();
      }, 1500);
    } catch (err: any) {
      setError(err.message || 'Failed to delete course');
    } finally {
      setIsDeleting(false);
    }
  };

  if (!isOpen || !course) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between p-6 border-b border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {view === 'edit' ? 'Edit Course' : 'View Course'}
            </h2>
            <p className="text-sm text-gray-600 mt-1">Course ID: {course._id}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 transition-colors rounded-lg hover:bg-blue-100"
          >
            <X size={24} className="text-gray-600" />
          </button>
        </div>

        {/* Content */}
        {view === 'view' ? (
          // View Mode
          <div className="p-6 space-y-6">
            {/* Course Thumbnail */}
            {course.thumbnail && (
              <div className="rounded-lg overflow-hidden">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-64 object-cover"
                />
              </div>
            )}

            {/* Course Info Grid */}
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-gray-600 mb-2">Level</p>
                <p className="text-lg font-bold text-gray-900">{course.level}</p>
              </div>

              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <p className="text-sm text-gray-600 mb-2">Status</p>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    course.status === 'published'
                      ? 'bg-green-200 text-green-800'
                      : 'bg-amber-200 text-amber-800'
                  }`}
                >
                  {course.status}
                </span>
              </div>

              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <p className="text-sm text-gray-600 mb-2">Students Enrolled</p>
                <p className="text-lg font-bold text-gray-900">{course.enrolledCount || 0}</p>
              </div>
            </div>

            {/* Title */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Title</h3>
              <p className="text-gray-700">{course.title}</p>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Description</h3>
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{course.description}</p>
            </div>

            {/* Course Stats */}
            <div className="grid md:grid-cols-2 gap-6 p-6 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm text-gray-600 mb-1">Rating</p>
                <p className="text-3xl font-bold text-yellow-600">
                  {course.rating ? course.rating.toFixed(1) : 'N/A'}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-1">Revenue</p>
                <p className="text-3xl font-bold text-emerald-600">
                  ${course.revenue ? course.revenue.toFixed(2) : '0.00'}
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
                <p>{course.createdAt ? new Date(course.createdAt).toLocaleDateString() : 'N/A'}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-700 mb-1">Last Updated</p>
                <p>{course.lastUpdated ? new Date(course.lastUpdated).toLocaleDateString() : 'N/A'}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4 border-t border-gray-200">
              <button
                onClick={() => window.open(`/courses/${course._id}`, '_blank')}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 font-semibold text-white transition-colors rounded-lg bg-blue-600 hover:bg-blue-700"
              >
                <Eye size={18} />
                View Full Course
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 font-semibold text-red-600 transition-colors border-2 border-red-200 rounded-lg hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Trash2 size={18} />
                {isDeleting ? 'Deleting...' : 'Delete'}
              </button>
              <button
                onClick={onClose}
                className="flex-1 px-4 py-3 font-semibold text-gray-700 transition-colors bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          // Edit Mode
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-3 p-4 border border-red-200 rounded-lg bg-red-50"
              >
                <AlertCircle className="flex-shrink-0 text-red-600" size={20} />
                <p className="text-red-700">{error}</p>
              </motion.div>
            )}

            {/* Success Message */}
            {success && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-3 p-4 border rounded-lg border-emerald-200 bg-emerald-50"
              >
                <CheckCircle className="flex-shrink-0 text-emerald-600" size={20} />
                <p className="text-emerald-700">{success}</p>
              </motion.div>
            )}

            {/* Title */}
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700">
                Course Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter course title"
                className="w-full px-4 py-3 transition-all border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                disabled={isSubmitting}
              />
            </div>

            {/* Description */}
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700">
                Description *
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter course description"
                rows={5}
                className="w-full px-4 py-3 transition-all border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent resize-none"
                disabled={isSubmitting}
              />
            </div>

            {/* Level */}
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700">
                Level
              </label>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="w-full px-4 py-3 transition-all border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                disabled={isSubmitting}
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>

            {/* Status */}
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-4 py-3 transition-all border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                disabled={isSubmitting}
              >
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
            </div>

            {/* Course Info Display */}
            <div className="grid md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm text-gray-600 mb-1">Instructor</p>
                <p className="font-semibold text-gray-900">{course.instructorName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Students Enrolled</p>
                <p className="font-semibold text-gray-900">{course.enrolledCount || 0}</p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-4 border-t border-gray-200">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 px-4 py-3 font-semibold text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Saving...' : 'Save Changes'}
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={isDeleting || isSubmitting}
                className="flex-1 px-4 py-3 font-semibold text-red-600 transition-colors border-2 border-red-200 rounded-lg hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isDeleting ? 'Deleting...' : 'Delete Course'}
              </button>
              <button
                type="button"
                onClick={onClose}
                disabled={isSubmitting || isDeleting}
                className="flex-1 px-4 py-3 font-semibold text-gray-700 transition-colors bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
};
