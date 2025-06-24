import { toast } from "react-hot-toast";

interface ToastOptions {
  duration?: number;
  position?:
    | "top-right"
    | "top-center"
    | "top-left"
    | "bottom-right"
    | "bottom-center"
    | "bottom-left";
}

export const useToast = () => {
  const success = (message: string, options?: ToastOptions) => {
    toast.success(message, {
      duration: options?.duration || 3000,
      position: options?.position || "top-right",
      style: {
        background: "#4CAF50",
        color: "#fff",
        padding: "16px",
        borderRadius: "8px"
      }
    });
  };

  const error = (message: string, options?: ToastOptions) => {
    toast.error(message, {
      duration: options?.duration || 3000,
      position: options?.position || "top-right",
      style: {
        background: "#F44336",
        color: "#fff",
        padding: "16px",
        borderRadius: "8px"
      }
    });
  };

  const info = (message: string, options?: ToastOptions) => {
    toast(message, {
      duration: options?.duration || 3000,
      position: options?.position || "top-right",
      style: {
        background: "#2196F3",
        color: "#fff",
        padding: "16px",
        borderRadius: "8px"
      }
    });
  };

  const warning = (message: string, options?: ToastOptions) => {
    toast(message, {
      duration: options?.duration || 3000,
      position: options?.position || "top-right",
      style: {
        background: "#FF9800",
        color: "#fff",
        padding: "16px",
        borderRadius: "8px"
      }
    });
  };

  return {
    success,
    error,
    info,
    warning
  };
};
