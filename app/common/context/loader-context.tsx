import { FC, ReactNode, createContext, useState } from "react";
import LoaderSkeleton from "../components/common/loader/loader-skeleton";

type LoaderContext = {
  showLoader: (message: string) => void;
  hideLoader: () => void;
};

type LoaderContextProvider = {
  children: ReactNode;
};

export const LoaderContext = createContext<LoaderContext | undefined>(
  undefined
);

export const LoaderProvider: FC<LoaderContextProvider> = ({ children }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [loaderMessage, setLoaderMessage] = useState<string | undefined>();

  const contextValue: LoaderContext = {
    showLoader: (message) => {
      setLoaderMessage(message);
      setIsVisible(true);
    },
    hideLoader: () => {
      setIsVisible(false);
    },
  };

  return (
    <LoaderContext.Provider value={contextValue}>
      {isVisible && <LoaderSkeleton message={loaderMessage} />}
      {children}
    </LoaderContext.Provider>
  );
};
