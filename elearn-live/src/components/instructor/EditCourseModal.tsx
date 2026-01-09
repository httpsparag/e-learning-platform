import React, { useState, useEffect } from 'react';
import { X, Upload, AlertCircle, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import CourseService from '../../services/course.service';
import { uploadVideoToCloudinary, getVideoUploadSignature } from '../../utils/cloudinary';

interface EditCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  course: any;
  onCourseUpdated?: () => void;
}

export const EditCourseModal = ({
  isOpen,
  onClose,
  course,
  onCourseUpdated,
}: EditCourseModalProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [level, setLevel] = useState('Beginner');
  const [videoUrl, setVideoUrl] = useState('');
  const [videoPublicId, setVideoPublicId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (isOpen && course) {
      setTitle(course.title || '');
      setDescription(course.description || '');
      setLevel(course.level || 'Beginner');
      setVideoUrl(course.videoUrl || '');
      setVideoPublicId(course.videoPublicId || '');
      setError('');
      setSuccess('');
    }
  }, [isOpen, course]);

  const handleVideoUpload = async () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'video/mp4,video/quicktime,video/x-msvideo,video/webm,video/x-flv,video/x-matroska';
    
    fileInput.onchange = async (e: any) => {
      const file = e.target.files[0];
      if (!file) return;

      setError('');
      
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
          setError('Authentication required. Please login again.');
          return;
        }

        console.log('🔐 Getting upload signature from backend...');
        const signatureData = await getVideoUploadSignature(token);
        
        console.log('📤 Starting secure video upload...');
        const response = await uploadVideoToCloudinary(file, signatureData);

        setVideoUrl(response.secure_url);
        setVideoPublicId(response.public_id);
        setSuccess('Video updated successfully!');
        setTimeout(() => setSuccess(''), 3000);
      } catch (err: any) {
        console.error('❌ Upload error:', err);
        setError(err.message || 'Video upload failed. Please try again.');
      }
    };

    fileInput.click();
  };

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
        ...(videoUrl && { videoUrl, videoPublicId }),
      };

      console.log('📤 Updating course:', updateData);
      await CourseService.updateCourse(course._id, updateData);
      console.log('✅ Course updated successfully');
      setSuccess('Course updated successfully!');

      setTimeout(() => {
        onClose();
        onCourseUpdated?.();
      }, 1500);
    } catch (err: any) {
      console.error('❌ Error updating course:', err.message);
      setError(err.message || 'Failed to update course');
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
        <div className="sticky top-0 flex items-center justify-between p-6 border-b border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
          <h2 className="text-2xl font-bold text-gray-900">Edit Course</h2>
          <button
            onClick={onClose}
            className="p-2 transition-colors rounded-lg hover:bg-blue-100"
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
              placeholder="Describe your course"
              rows={4}
              className="w-full px-4 py-3 transition-all border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
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
              className="w-full px-4 py-3 transition-all border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              disabled={isSubmitting}
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

          {/* Video Section */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Course Video
            </label>
            <div className="p-6 border-2 border-blue-300 border-dashed rounded-lg bg-blue-50">
              {videoUrl ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-blue-100 rounded-lg">
                    <Upload className="text-blue-600" size={20} />
                    <div>
                      <p className="text-sm font-semibold text-blue-900">Video uploaded</p>
                      <p className="text-xs text-blue-700">Click to replace</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleVideoUpload}
                    className="text-sm font-semibold text-blue-600 hover:text-blue-700"
                  >
                    Upload different video
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleVideoUpload}
                  className="flex flex-col items-center w-full gap-3 px-4 py-10 text-blue-600 transition-colors cursor-pointer hover:text-blue-700"
                >
                  <Upload size={48} className="text-blue-500" />
                  <div className="text-center">
                    <p className="text-base font-semibold text-gray-900">Click to upload video</p>
                  </div>
                </button>
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
              disabled={isSubmitting}
              className="flex items-center justify-center flex-1 gap-2 px-4 py-3 font-semibold text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white rounded-full border-t-transparent animate-spin" />
                  Updating...
                </>
              ) : (
                'Update Course'
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};
