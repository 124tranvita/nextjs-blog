import { useContext } from "react";
import { ToastMsgContext } from "@/app/common/context/toast-msg-context";

export default function useToastMsg() {
  const context = useContext(ToastMsgContext);

  if (!context) {
    throw new Error("useToastMsg must be used within a LoaderProvider");
  }
  return context;
}
