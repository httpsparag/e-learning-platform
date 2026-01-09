import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Play, Pause, Volume2, Maximize, SkipBack, SkipForward } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { FloatingNavbar } from '../../components/layout/FloatingNavbar';
import CourseService from '../../services/course.service';
import type { Course } from '../../services/course.service';

export const CoursePlay: React.FC = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [course, setCourse] = useState<Course | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!isAuthenticated || !user) {
      navigate('/auth/login');
      return;
    }

    fetchCourse();
  }, [courseId, isAuthenticated, user, navigate]);

  const fetchCourse = async () => {
    try {
      setIsLoading(true);
      const data = await CourseService.getCourseById(courseId!);
      setCourse(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load course');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white text-lg font-semibold">Loading course...</p>
        </div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 text-lg font-semibold mb-4">{error || 'Course not found'}</p>
          <button
            onClick={() => navigate('/courses')}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold"
          >
            Back to Courses
          </button>
        </div>
      </div>
    );
  }

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <>
      <FloatingNavbar />
      <div className="min-h-screen bg-gray-900 text-white">
        {/* Video Player Section */}
        <div className="w-full h-screen bg-black flex flex-col">
          {/* Back Button */}
          <div className="absolute top-20 left-6 z-20">
            <button
              onClick={() => navigate('/courses')}
              className="flex items-center gap-2 px-4 py-2 bg-black bg-opacity-50 hover:bg-opacity-75 rounded-lg transition-all"
            >
              <ArrowLeft size={20} />
              <span className="text-sm font-semibold">Back to Courses</span>
            </button>
          </div>

          {/* Video Player Container */}
          <div className="flex-1 flex items-center justify-center bg-black relative">
            <video
              src={course.videoUrl}
              onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
              onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              controls
              autoPlay
              className="w-full h-full object-contain"
            />

            {/* Custom Controls Overlay (for reference, HTML5 controls also work) */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
              {/* Progress Bar */}
              <div className="mb-4">
                <div className="w-full bg-gray-700 rounded-full h-1 cursor-pointer hover:h-1.5 transition-all group"
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const percent = (e.clientX - rect.left) / rect.width;
                    const video = e.currentTarget.parentElement?.querySelector('video') as HTMLVideoElement;
                    if (video) video.currentTime = percent * duration;
                  }}>
                  <div
                    className="bg-red-600 h-full rounded-full transition-all"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Course Info Sidebar */}
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Left: Course Content */}
            <div className="md:col-span-2">
              {/* Course Title */}
              <h1 className="text-4xl font-bold mb-2">{course.title}</h1>
              <p className="text-gray-400 mb-6">{course.description}</p>

              {/* Course Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 pb-8 border-b border-gray-800">
                <div>
                  <p className="text-gray-400 text-sm">Level</p>
                  <p className="text-xl font-semibold text-white capitalize">{course.level}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Students</p>
                  <p className="text-xl font-semibold text-white">{course.enrolledCount}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Rating</p>
                  <p className="text-xl font-semibold text-yellow-400">{course.rating.toFixed(1)} ⭐</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Revenue</p>
                  <p className="text-xl font-semibold text-emerald-400">${course.revenue}</p>
                </div>
              </div>

              {/* Course Description Section */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-4">About This Course</h2>
                  <p className="text-gray-300 leading-relaxed">
                    {course.description}
                  </p>
                </div>

                {/* What You'll Learn */}
                <div>
                  <h3 className="text-xl font-bold mb-4">What You'll Learn</h3>
                  <ul className="space-y-3">
                    {[
                      'Master the fundamentals of this subject',
                      'Build real-world projects from scratch',
                      'Learn industry best practices',
                      'Get lifetime access to course materials'
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-gray-300">
                        <span className="text-emerald-500 mt-1">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Right: Sidebar */}
            <div className="md:col-span-1">
              {/* Enrolled Card */}
              <div className="bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">✓ Enrolled</h3>
                <p className="text-emerald-100 mb-6">You're now enrolled in this course and have full access.</p>

                <div className="bg-emerald-700 bg-opacity-50 rounded-lg p-4 mb-6">
                  <p className="text-sm text-emerald-100 mb-2">Enrollment Date</p>
                  <p className="text-lg font-semibold">{new Date().toLocaleDateString()}</p>
                </div>

                <button
                  onClick={() => navigate('/courses')}
                  className="w-full py-3 px-4 bg-white text-emerald-600 font-bold rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Back to Course List
                </button>
              </div>

              {/* Instructor Info */}
              <div className="bg-gray-800 rounded-xl p-6 mt-6">
                <h4 className="text-lg font-bold mb-4">Instructor</h4>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                    {course.instructorName?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold">{course.instructorName}</p>
                    <p className="text-sm text-gray-400">{course.instructorEmail}</p>
                  </div>
                </div>
              </div>

              {/* Course Details */}
              <div className="bg-gray-800 rounded-xl p-6 mt-6 space-y-4">
                <h4 className="text-lg font-bold">Course Details</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Capacity</span>
                    <span className="font-semibold">{course.capacity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Status</span>
                    <span className={`font-semibold ${course.status === 'Active' ? 'text-emerald-400' : 'text-yellow-400'}`}>
                      {course.status}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Created</span>
                    <span className="font-semibold text-xs">{new Date(course.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
