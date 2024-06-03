// @/common/ui/new/index.tsx
"use client";

import React, { FC, useCallback, useEffect, useMemo, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { createPost } from "@/actions";
import { Post, initPost } from "@/app/common/lib/model";
import useDictionary from "@/app/common/hooks/useDictionary";
import useScreenPath from "@/app/common/hooks/useScreenPath";
import useImageUpload from "@/app/common/hooks/useImageUpload";
import useEditor from "@/app/common/hooks/useEditor";
import useLoader from "@/app/common/hooks/useLoader";
import Input from "@/app/common/components/react-hook-form/input";
import FileSelector from "@/app/common/components/react-hook-form/file-selector";
import ScrollableDialog from "@/app/common/components/dialog/scrollable-dialog";
import { Button } from "@/app/common/components/common/button";
import { EditorContainer } from "@/app/common/components/common/container";
import * as Utils from "@/app/common/lib/utils";
import * as Constants from "@/app/common/lib/constants";
import PostDetailView from "@/app/common/components/post-view";

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
  const [previewData, setPreviewData] = useState<Post>(initPost);

  const { d } = useDictionary();
  const { next } = useScreenPath();
  const { showLoader } = useLoader();
  const {
    processImageData,
    ImagePreview,
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
  } = useForm<FormDataProps>({ mode: "onChange" });
  const [cloudImg] = watch(["cloudImg"]);
  const [localImg] = watch(["localImg"]);

  /** Disable flag for image input field */
  const disable = useMemo(() => {
    return {
      cloudImg: Boolean(localImg && localImg.length > 0),
      localImg: Boolean(cloudImg),
    };
  }, [cloudImg, localImg]);

  /** Disable flag for submit button and preview button */
  const disbaleBtn = useMemo(() => {
    return isLoadingImg || !Utils.isObjectEmpty(errors);
  }, [isLoadingImg, errors]);

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
      ...initPost,
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
        clearErrors();

        if (!value) return;

        if (value && value[0] && value[0].size > Constants.LIMIT_FILE_SIZE) {
          setError("localImg", { message: d("errors.exceedLimitSize") });
          return;
        }

        const uploadedImg = value && value.length > 0 ? value[0] : undefined;
        processImageData(uploadedImg);
      } catch (error) {
        console.error(error);
      }
    },
    [processImageData, setError, clearErrors, d]
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
            disabled={disbaleBtn}
          >
            <PostDetailView post={previewData} view="detail" />
          </ScrollableDialog>
        </div>
        <Button
          variant="primary"
          type="submit"
          label={d("editor.submit")}
          fullWidth
          disabled={disbaleBtn}
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
