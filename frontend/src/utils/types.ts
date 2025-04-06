export type ToastContextType = {
  isOpen: boolean;
  toastMessage: string;
  toastType: "error" | "success" | "info";
  triggerToast: (
    toastMessage: string,
    toastType: "error" | "success" | "info"
  ) => void;
  toastTitle: string;
  setToastTitle: (toastTitle: string) => void;
};

export type User = {
  _id: string;
  name: string;
  email: string;
};

export type AuthContextType = {
  user: User | null;
};

export type LoaderContextType = {
  isOpen: boolean;
  openLoader: () => void;
  closeLoader: () => void;
};
