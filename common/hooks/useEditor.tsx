// hooks/useEditor.tsx
"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef } from "react";

const JoditEditor = dynamic(
  () => {
    return import("../components/jodit-editor");
  },
  { ssr: false }
);

export default function useEditor(
  initialValue: string = "",
  placeholder: string = ""
) {
  const editorRef = useRef<any>(null);

  useEffect(() => {
    if (!initialValue) return;
    editorRef.current = initialValue;
  }, [initialValue]);

  const getContent = useCallback(() => {
    return editorRef.current;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editorRef.current]);

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

  return { getContent, Editor };
}
