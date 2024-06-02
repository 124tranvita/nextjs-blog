import { LoaderContext } from "@/app/common/context/loader-context";
import { useContext } from "react";

export default function useLoader() {
  const context = useContext(LoaderContext);

  if (!context) {
    throw new Error("useLoader must be used within a LoaderProvider");
  }
  return context;
}
