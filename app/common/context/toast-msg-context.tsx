import { FC, ReactNode, createContext, useState } from "react";
import LoaderSkeleton from "../components/common/loader/loader-skeleton";
import ToastMsgComponent from "../components/common/toast-msg";

type ToastMsgContext = {
  showToast: (type: string, message: string) => void;
  hideToast: () => void;
};

type ToastMsgContextProvider = {
  children: ReactNode;
};

export const ToastMsgContext = createContext<ToastMsgContext | undefined>(
  undefined
);

export const ToastMsgProvider: FC<ToastMsgContextProvider> = ({ children }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | undefined>();
  const [toastVariant, setToastVariant] = useState<string | undefined>();

  const contextValue: ToastMsgContext = {
    showToast: (type, message) => {
      setToastMessage(message);
      setToastVariant(type);
      setIsVisible(true);
    },
    hideToast: () => {
      setIsVisible(false);
    },
  };

  return (
    <ToastMsgContext.Provider value={contextValue}>
      {isVisible && (
        <ToastMsgComponent
          variant={toastVariant}
          message={toastMessage}
          hideToast={contextValue.hideToast}
        />
      )}
      {children}
    </ToastMsgContext.Provider>
  );
};
