import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

interface ToastContextType {
  toasts: Toast[];
  showToast: (message: string, type?: ToastType, duration?: number) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: ToastType = 'success', duration = 4000) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast: Toast = { id, message, type, duration };

    setToasts((prev) => [...prev, newToast]);

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, showToast, removeToast }}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
};

interface ToastContainerProps {
  toasts: Toast[];
  removeToast: (id: string) => void;
}

const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, removeToast }) => {
  return (
    <div className="fixed top-6 right-6 z-50 flex flex-col gap-3 pointer-events-none">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onRemove={removeToast} />
      ))}
    </div>
  );
};

interface ToastItemProps {
  toast: Toast;
  onRemove: (id: string) => void;
}

const ToastItem: React.FC<ToastItemProps> = ({ toast, onRemove }) => {
  const getStyles = () => {
    switch (toast.type) {
      case 'success':
        return {
          bg: 'bg-gradient-to-r from-emerald-50 to-green-50',
          border: 'border-emerald-200',
          icon: <CheckCircle className="text-emerald-600" size={20} />,
          text: 'text-emerald-900',
          progress: 'bg-emerald-500',
        };
      case 'error':
        return {
          bg: 'bg-gradient-to-r from-red-50 to-pink-50',
          border: 'border-red-200',
          icon: <AlertCircle className="text-red-600" size={20} />,
          text: 'text-red-900',
          progress: 'bg-red-500',
        };
      case 'info':
        return {
          bg: 'bg-gradient-to-r from-blue-50 to-cyan-50',
          border: 'border-blue-200',
          icon: <Info className="text-blue-600" size={20} />,
          text: 'text-blue-900',
          progress: 'bg-blue-500',
        };
      case 'warning':
        return {
          bg: 'bg-gradient-to-r from-amber-50 to-yellow-50',
          border: 'border-amber-200',
          icon: <AlertCircle className="text-amber-600" size={20} />,
          text: 'text-amber-900',
          progress: 'bg-amber-500',
        };
      default:
        return {
          bg: 'bg-gradient-to-r from-gray-50 to-slate-50',
          border: 'border-gray-200',
          icon: <Info className="text-gray-600" size={20} />,
          text: 'text-gray-900',
          progress: 'bg-gray-500',
        };
    }
  };

  const styles = getStyles();

  return (
    <div
      className={`pointer-events-auto animate-in fade-in slide-in-from-top-5 ${styles.bg} border ${styles.border} rounded-xl shadow-xl overflow-hidden max-w-md w-full`}
    >
      {/* Progress Bar */}
      <div className="h-1 w-full bg-gray-100">
        <div
          className={`h-full ${styles.progress} animate-pulse`}
          style={{
            animation: `shrink ${toast.duration || 4000}ms linear forwards`,
          }}
        />
      </div>

      {/* Content */}
      <div className="p-4 flex gap-3 items-start">
        {/* Icon */}
        <div className="shrink-0 mt-0.5">{styles.icon}</div>

        {/* Message */}
        <div className="flex-1 min-w-0">
          <p className={`text-sm font-semibold ${styles.text}`}>{toast.message}</p>
        </div>

        {/* Close Button */}
        <button
          onClick={() => onRemove(toast.id)}
          className={`shrink-0 p-1 rounded-lg transition-colors ${
            toast.type === 'success'
              ? 'hover:bg-emerald-100 text-emerald-600'
              : toast.type === 'error'
              ? 'hover:bg-red-100 text-red-600'
              : toast.type === 'info'
              ? 'hover:bg-blue-100 text-blue-600'
              : 'hover:bg-amber-100 text-amber-600'
          }`}
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
};
