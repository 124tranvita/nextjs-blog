// app/[lang]/edit/[slug]/components/edit-post.tsx
"use client";

import React, { FC, useCallback, useEffect, useState, useMemo } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Input from "@/components/react-hook-form/input";
import ScrollableDialog from "@/components/dialog/scrollable-dialog";
import PostPreview from "@/components/post/post-preview";
import FileSelector from "@/components/react-hook-form/file-selector";
import { EditorContainer } from "@/components/common";
import useScreenPath from "@/hooks/useScreenPath";
import useDictionary from "@/hooks/useDictionary";
import useImageUpload from "@/hooks/useImageUpload";
import useEditor from "@/hooks/useEditor";
import { editPost } from "@/app/actions";
import { Button } from "@/app/ui/button";
import {
  Post,
  PostPreview as PostPreviewType,
  initPostPreview,
} from "@/app/lib/model";
import * as Utils from "@/app/lib/utils";

type FormDataProps = {
  title: string;
  cloudImg: string;
  localImage: File[];
};

/**
 * Render the edit post screen
 * @returns - Component
 */
const EditPost: FC<{ post: Post }> = ({ post }) => {
  const { _id, title, coverImgFileId, content } = post;

  const [previewData, setPreviewData] =
    useState<PostPreviewType>(initPostPreview);
  const [isMoveNext, setIsMoveNext] = useState(false);

  const { d } = useDictionary();
  const { next } = useScreenPath();
  const { processImageData, ImagePreview, imageData, isClearedUploadProcced } =
    useImageUpload(coverImgFileId);
  const { getContent, Editor } = useEditor(content);

  const {
    handleSubmit,
    register,
    getValues,
    setValue,
    setError,
    clearErrors,
    watch,
    formState: { errors },
  } = useForm<FormDataProps>({
    defaultValues: {
      title,
    },
  });
  const [cloudImg] = watch(["cloudImg"]);
  const [localImage] = watch(["localImage"]);

  /** Disable flag for image input field */
  const disable = useMemo(() => {
    return {
      cloudImg: Boolean(localImage && localImage.length > 0),
      localImage: Boolean(cloudImg),
    };
  }, [cloudImg, localImage]);

  /** Hanlde submit form */
  const onSubmit: SubmitHandler<FormDataProps> = useCallback(
    (data) => {
      const formData = new FormData();
      const editorContent = getContent();

      // Process when editor has content.
      if (editorContent) {
        formData.append("title", data.title);
        formData.append("coverImg", imageData as Blob);
        formData.append("content", editorContent);

        // Call `editPost` action
        editPost(_id, formData, coverImgFileId);
        // Set `MovingPage` loading to true
        setIsMoveNext(true);
      }
    },
    [_id, coverImgFileId, getContent, imageData]
  );

  /** Handle post preview event */
  const onPreview = useCallback(() => {
    const values = getValues();
    const editorContent = getContent();
    // Set preview value
    setPreviewData({
      title: values.title,
      cover: imageData ? (URL.createObjectURL(imageData) as string) : "",
      content: editorContent ? editorContent : content,
    });
  }, [getValues, getContent, imageData, , content]);

  /** Hanlde process image data with url */
  const onBlurCoverImgInput = useCallback(
    async (value: string) => {
      try {
        clearErrors();

        if (!value) return;

        if (!Utils.isValidUrl(value)) {
          setError("cloudImg", { message: d("errors.invalidUrl") });
          return;
        }

        processImageData(value);
      } catch (error) {
        console.error(error);
      }
    },
    [processImageData, setError, clearErrors, d]
  );

  /** Hanlde process image data with local upload */
  const onChangeFileSelector = useCallback(
    async (value: FileList | null) => {
      try {
        if (!value) return;

        const uploadedImg = value && value.length > 0 ? value[0] : undefined;
        processImageData(uploadedImg);
      } catch (error) {
        console.error(error);
      }
    },
    [processImageData]
  );

  /** Handle back event */
  const hanldeBack = useCallback(() => {
    next(`/post/${_id}`);
  }, [_id, next]);

  /** Depend on clear upload image process */
  useEffect(() => {
    if (isClearedUploadProcced) {
      setValue("localImage", []);
      setValue("cloudImg", "");
    }
  }, [isClearedUploadProcced, setValue]);

  return (
    <EditorContainer isMoveNext={isMoveNext}>
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <div className="mb-3">
          <Input
            label={d("editor.title")}
            errors={errors}
            {...register("title", {
              required: d("errors.input"),
              maxLength: 128,
            })}
          />
        </div>
        <div className="mb-3">
          <Input
            label={d("editor.coverImg")}
            placeholder={`${title}.jpg`}
            errors={errors}
            {...register("cloudImg", {
              onBlur: (e) => onBlurCoverImgInput(e.target.value),
              validate: (value) =>
                imageData ||
                value ||
                (!value &&
                  getValues().localImage &&
                  getValues().localImage.length > 0)
                  ? true
                  : d("errors.coverImg"),
            })}
            disabled={disable.cloudImg}
          />
        </div>
        <div className="mb-3">
          <FileSelector
            errors={errors}
            {...register("localImage", {
              onChange: (e) => onChangeFileSelector(e.target.files),
            })}
            disabled={disable.localImage}
          />
        </div>
        <div className="mb-3">{ImagePreview}</div>
        <div className="mt-6">{Editor}</div>
        <div>
          <ScrollableDialog
            btnLabel={d("editor.preview")}
            title={d("editor.preview")}
          >
            <PostPreview previewData={previewData} onPreview={onPreview} />
          </ScrollableDialog>
        </div>
        <Button
          variant="primary"
          type="submit"
          label={d("editor.save")}
          fullWidth
        />
        <Button
          variant="danger"
          type="button"
          label={d("editor.back")}
          fullWidth
          onClick={hanldeBack}
        />
      </form>
    </EditorContainer>
  );
};

export default EditPost;
