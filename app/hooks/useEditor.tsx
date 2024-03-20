// app/hooks/useEditor.tsx
"use client";

import dynamic from "next/dynamic";
import { useCallback, useRef } from "react";

const JoditEditor = dynamic(
  () => {
    return import("@/components/jodit-editor");
  },
  { ssr: false }
);

export default function useEditor(
  initialValue: string = "",
  placeholder: string = ""
) {
  const editorRef = useRef<any>(null);

  /** Handle editor onInit event */
  const onBlur = useCallback((newContent: string) => {
    editorRef.current = newContent;
  }, []);

  const Editor = (
    <>
      <JoditEditor
        onBlur={onBlur}
        initialValue={initialValue}
        placeholder={placeholder}
      />
    </>
  );

  return { editorContent: editorRef.current, Editor };
}
