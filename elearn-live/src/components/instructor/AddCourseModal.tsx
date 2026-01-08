import { useState } from 'react';
import { X, Upload, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { CldUploadWidget } from 'next-cloudinary';
import CourseService from '../../services/course.service';

interface AddCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  instructorName: string;
  instructorEmail: string;
  onCourseAdded?: () => void;
}

export const AddCourseModal = ({
  isOpen,
  onClose,
  instructorName,
  instructorEmail,
  onCourseAdded,
}: AddCourseModalProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [level, setLevel] = useState('Beginner');
  const [videoUrl, setVideoUrl] = useState('');
  const [videoPublicId, setVideoPublicId] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleVideoUpload = (result: any) => {
    if (result.event === 'success') {
      setVideoUrl(result.info.secure_url);
      setVideoPublicId(result.info.public_id);
      setSuccess('Video uploaded successfully!');
      setTimeout(() => setSuccess(''), 3000);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!title || !description || !videoUrl) {
      setError('Please fill all fields and upload a video');
      return;
    }

    setIsSubmitting(true);
    try {
      const courseData = {
        title,
        description,
        videoUrl,
        videoPublicId,
        instructorName,
        instructorEmail,
        level: level as 'Beginner' | 'Intermediate' | 'Advanced',
      };

      await CourseService.createCourse(courseData);
      setSuccess('Course created successfully!');
      
      // Reset form
      setTitle('');
      setDescription('');
      setLevel('Beginner');
      setVideoUrl('');
      setVideoPublicId('');

      setTimeout(() => {
        onClose();
        onCourseAdded?.();
      }, 1500);
    } catch (err: any) {
      setError(err.message || 'Failed to create course');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between p-6 border-b bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200">
          <h2 className="text-2xl font-bold text-gray-900">Create New Course</h2>
          <button
            onClick={onClose}
            className="p-2 transition-colors rounded-lg hover:bg-emerald-100"
          >
            <X size={24} className="text-gray-600" />
          </button>
        </div>

        {/* Form */}
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
              className="p-4 border rounded-lg bg-emerald-50 border-emerald-200"
            >
              <p className="font-semibold text-emerald-700">{success}</p>
            </motion.div>
          )}

          {/* Instructor Info */}
          <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
            <p className="text-sm text-gray-600">Instructor</p>
            <p className="text-lg font-semibold text-gray-900">{instructorName}</p>
            <p className="text-sm text-gray-600">{instructorEmail}</p>
          </div>

          {/* Title */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Course Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter course title (e.g., Advanced React & TypeScript)"
              className="w-full px-4 py-3 transition-all border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
              disabled={isSubmitting}
            />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Short Description *
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief description of your course (what students will learn)"
              rows={4}
              className="w-full px-4 py-3 transition-all border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
              disabled={isSubmitting}
            />
          </div>

          {/* Level */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Course Level
            </label>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="w-full px-4 py-3 transition-all border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
              disabled={isSubmitting}
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

          {/* Video Upload */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Upload Course Video *
            </label>
            <div className="p-6 border-2 border-dashed rounded-lg border-emerald-300 bg-emerald-50">
              {videoUrl ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-emerald-100">
                    <Upload className="text-emerald-600" size={20} />
                    <div>
                      <p className="text-sm font-semibold text-emerald-900">Video uploaded</p>
                      <p className="text-xs text-emerald-700">Ready to use</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setVideoUrl('');
                      setVideoPublicId('');
                    }}
                    className="text-sm font-semibold text-emerald-600 hover:text-emerald-700"
                  >
                    Upload different video
                  </button>
                </div>
              ) : (
                <CldUploadWidget
                  uploadPreset="courses_video"
                  cloudName={import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}
                  onSuccess={handleVideoUpload}
                  options={{
                    resourceType: 'video',
                    maxFileSize: 500000000, // 500MB
                    folder: 'instructor-courses',
                    sources: ['local', 'url'],
                    multiple: false,
                    maxFiles: 1,
                  }}
                >
                  {({ open }) => (
                    <button
                      type="button"
                      onClick={() => open()}
                      className="flex flex-col items-center w-full gap-2 transition-colors text-emerald-600 hover:text-emerald-700"
                    >
                      <Upload size={32} />
                      <p className="text-sm font-semibold">Click to upload video</p>
                      <p className="text-xs text-emerald-600">or drag and drop</p>
                      <p className="mt-2 text-xs text-gray-600">MP4, MOV, AVI up to 500MB</p>
                    </button>
                  )}
                </CldUploadWidget>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1 px-4 py-3 font-semibold text-gray-700 transition-colors border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !videoUrl}
              className="flex items-center justify-center flex-1 gap-2 px-4 py-3 font-semibold text-white transition-colors rounded-lg bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white rounded-full border-t-transparent animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Upload size={18} />
                  Create Course
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};
