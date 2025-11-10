import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import type { Toast as ToastType } from '../types';

// --- ICONS ---
const CheckCircleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const XCircleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const XIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);


// --- TOAST COMPONENT ---
const Toast: React.FC<{ toast: ToastType; onClose: () => void }> = ({ toast, onClose }) => {
  const { message, type } = toast;

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const isSuccess = type === 'success';
  const baseClasses = "w-full max-w-sm p-4 rounded-lg shadow-lg flex items-start space-x-4 animate-fade-in border-l-4";
  const typeClasses = isSuccess
    ? "bg-[--accent] border-[--primary] text-[--primary]"
    : "bg-[--destructive]/10 border-[--destructive] text-[--destructive]";
  const Icon = isSuccess ? CheckCircleIcon : XCircleIcon;

  return (
    <div className={`${baseClasses} ${typeClasses}`} role="alert">
      <div className="flex-shrink-0">
        <Icon className="h-6 w-6" aria-hidden="true" />
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-[--foreground]">{message}</p>
      </div>
      <button onClick={onClose} className="text-[--muted-foreground] hover:text-[--foreground] transition-colors" aria-label="Close notification">
        <XIcon className="h-5 w-5" aria-hidden="true" />
      </button>
    </div>
  );
};

// --- TOAST CONTAINER ---
const ToastContainer: React.FC<{ toasts: ToastType[]; removeToast: (id: number) => void }> = ({ toasts, removeToast }) => {
    return (
        <div className="fixed top-0 right-0 z-50 p-4 space-y-3 w-full max-w-sm">
            {toasts.map(toast => (
                <Toast key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
            ))}
        </div>
    );
};


// --- CONTEXT, PROVIDER, and HOOK ---
interface ToastContextType {
    addToast: (toast: Omit<ToastType, 'id'>) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [toasts, setToasts] = useState<ToastType[]>([]);

    const addToast = useCallback((toast: Omit<ToastType, 'id'>) => {
        const id = Date.now();
        setToasts(prev => [...prev, { ...toast, id }]);
    }, []);

    const removeToast = useCallback((id: number) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    }, []);
    
    return (
        <ToastContext.Provider value={{ addToast }}>
            {children}
            <ToastContainer toasts={toasts} removeToast={removeToast} />
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};