import { Trash2, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

interface DeleteInstructorModalProps {
  isOpen: boolean;
  instructorName: string;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  loading: boolean;
}

export const DeleteInstructorModal = ({
  isOpen,
  instructorName,
  onClose,
  onConfirm,
  loading,
}: DeleteInstructorModalProps) => {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md p-6 bg-white shadow-lg rounded-xl"
      >
        {/* Icon */}
        <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-red-100 rounded-full">
          <AlertTriangle className="text-red-600" size={24} />
        </div>

        {/* Content */}
        <h2 className="mb-2 text-xl font-bold text-center text-gray-900">
          Delete Instructor?
        </h2>
        <p className="mb-6 text-center text-gray-600">
          Are you sure you want to remove <span className="font-semibold">{instructorName}</span> from your organization? This action cannot be undone.
        </p>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 font-medium text-gray-700 transition-colors border border-gray-200 rounded-lg hover:bg-gray-50"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex items-center justify-center flex-1 gap-2 px-4 py-2 font-medium text-white transition-colors bg-red-600 rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white rounded-full border-t-transparent animate-spin" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 size={18} />
                Delete
              </>
            )}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};
