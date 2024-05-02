// @/common/ui/new/index.tsx
"use client";

import React, { FC, useCallback, useEffect, useMemo, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { createPost } from "@/actions";
import {
  PostPreview as PostPreviewType,
  initPostPreview,
} from "@/common/lib/model";
import useDictionary from "@/common/hooks/useDictionary";
import useScreenPath from "@/common/hooks/useScreenPath";
import useImageUpload from "@/common/hooks/useImageUpload";
import useEditor from "@/common/hooks/useEditor";
import useLoader from "@/common/hooks/useLoader";
import Input from "@/common/components/react-hook-form/input";
import FileSelector from "@/common/components/react-hook-form/file-selector";
import ScrollableDialog from "@/common/components/dialog/scrollable-dialog";
import PostPreview from "@/common/components/post-preview";
import { Button } from "@/common/components/common/button";
import { EditorContainer } from "@/common/components/common/container";
import * as Utils from "@/common/lib/utils";

type FormDataProps = {
  title: string;
  cloudImg: string;
  localImg: File[];
};

/**
 * Render the create new post screen
 * @returns - Component
 */
const NewPost: FC = () => {
  const [previewData, setPreviewData] =
    useState<PostPreviewType>(initPostPreview);

  const { d } = useDictionary();
  const { next } = useScreenPath();
  const { showLoader } = useLoader();
  const {
    processImageData,
    ImagePreview,
    // imageData,
    isClearedUploadProcced,
    isLoadingImg,
  } = useImageUpload({
    cloudImg: "",
    localImg: "",
  });
  const { getContent, Editor } = useEditor("", d("editor.placeholder"));

  const {
    handleSubmit,
    register,
    getValues,
    setValue,
    setError,
    clearErrors,
    watch,
    formState: { errors },
  } = useForm<FormDataProps>();
  const [cloudImg] = watch(["cloudImg"]);
  const [localImg] = watch(["localImg"]);

  /** Disable flag for image input field */
  const disable = useMemo(() => {
    return {
      cloudImg: Boolean(localImg && localImg.length > 0),
      localImg: Boolean(cloudImg),
    };
  }, [cloudImg, localImg]);

  /** Hanlde submit form */
  const onSubmit: SubmitHandler<FormDataProps> = useCallback(
    async (data) => {
      const formData = new FormData();
      const editorContent = getContent();

      // Process when editor has content.
      if (editorContent) {
        formData.append("title", data.title);
        formData.append("content", editorContent);
        formData.append("cloudImg", cloudImg ? cloudImg : "");
        formData.append(
          "localImg",
          localImg && localImg[0] ? (localImg[0] as Blob) : ""
        );

        // Call `createPost` action
        createPost(formData);

        // Set `MovingPage` loader
        showLoader(d("loader.processing"));
      }
    },
    [cloudImg, d, getContent, localImg, showLoader]
  );

  /** Handle post preview event */
  const onPreview = useCallback(() => {
    const values = getValues();
    const editorContent = getContent();
    // Set preview value
    setPreviewData({
      title: values.title,
      cloudImg,
      localImg:
        localImg && localImg[0] ? URL.createObjectURL(localImg[0] as File) : "",
      content: editorContent ? editorContent : "",
    });
  }, [getValues, getContent, localImg, cloudImg]);

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
    next(`/`);
  }, [next]);

  /** Depend on clear upload image process */
  useEffect(() => {
    if (isClearedUploadProcced) {
      setValue("localImg", []);
      setValue("cloudImg", "");
    }
  }, [isClearedUploadProcced, setValue]);

  return (
    <EditorContainer>
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <div className="mb-3">
          <Input
            label={d("editor.title")}
            placeholder={d("editor.placeholder")}
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
            placeholder={d("editor.placeholderCoverImg")}
            errors={errors}
            {...register("cloudImg", {
              onBlur: (e) => onBlurCoverImgInput(e.target.value),
              validate: (value) =>
                value ||
                (!value &&
                  getValues().localImg &&
                  getValues().localImg.length > 0)
                  ? true
                  : d("errors.coverImg"),
            })}
            disabled={disable.cloudImg}
          />
        </div>
        <div className="mb-3">
          <FileSelector
            errors={errors}
            {...register("localImg", {
              onChange: (e) => onChangeFileSelector(e.target.files),
            })}
            disabled={disable.localImg}
          />
        </div>
        <div className="mb-3">{ImagePreview}</div>
        <div className="mt-6">{Editor}</div>
        <div>
          <ScrollableDialog
            btnLabel={d("editor.preview")}
            title={d("editor.preview")}
            onPreview={onPreview}
            disabled={isLoadingImg}
          >
            <PostPreview previewData={previewData} />
          </ScrollableDialog>
        </div>
        <Button
          variant="primary"
          type="submit"
          label={d("editor.submit")}
          fullWidth
          disabled={isLoadingImg}
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

export default NewPost;
