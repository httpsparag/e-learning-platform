import { Plus, BookOpen } from "lucide-react";
import { motion } from "framer-motion";

export const OrganizationCourses = () => {
  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-lg font-bold text-gray-900">Courses</h3>
          <p className="mt-1 text-sm text-gray-600">
            Manage courses created by your organization
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 font-medium text-white transition-colors rounded-lg bg-emerald-600 hover:bg-emerald-700">
          <Plus size={20} />
          Create Course
        </button>
      </div>

      {/* Empty State */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-12 text-center bg-white rounded-lg shadow"
      >
        <BookOpen className="mx-auto mb-4 text-gray-400" size={48} />
        <h3 className="mb-2 text-lg font-semibold text-gray-900">
          No courses yet
        </h3>
        <p className="mb-6 text-gray-600">
          Start creating courses for your organization
        </p>
        <button className="inline-flex items-center gap-2 px-4 py-2 font-medium text-white transition-colors rounded-lg bg-emerald-600 hover:bg-emerald-700">
          <Plus size={20} />
          Create First Course
        </button>
      </motion.div>
    </div>
  );
};
