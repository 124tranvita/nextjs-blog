// @/common/ui/new/index.tsx
"use client";

import React, { FC, useCallback, useEffect, useMemo, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { createPost } from "@/actions";
import useDictionary from "@/app/common/hooks/useDictionary";
import useImageUpload from "@/app/common/hooks/useImageUpload";
import useEditor from "@/app/common/hooks/useEditor";
import useLoader from "@/app/common/hooks/useLoader";
import useToastMsg from "@/app/common/hooks/useToastMsg";
import Input from "@/app/common/components/react-hook-form/input";
import FileSelector from "@/app/common/components/react-hook-form/file-selector";
import ScrollableDialog from "@/app/common/components/dialog/scrollable-dialog";
import { Button } from "@/app/common/components/common/button";
import { EditorContainer } from "@/app/common/components/common/container";
import PostDetailView from "@/app/common/components/post-view";
import { Post, initPost } from "@/app/common/lib/model";
import * as Utils from "@/app/common/lib/utils";
import * as Constants from "@/app/common/lib/constants";

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
  const router = useRouter();
  const [previewData, setPreviewData] = useState<Post>(initPost);
  const [response, setResponse] = useState<any>(null);

  const { d } = useDictionary();
  const { showLoader, hideLoader } = useLoader();
  const { showToast } = useToastMsg();
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
      // Show `processing` loader
      showLoader(d("loader.processing"));

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
        const result = await createPost(formData);

        setResponse(JSON.parse(result));
      }
    },
    [cloudImg, d, getContent, localImg, showLoader]
  );

  /** Handle post preview event */
  const onPreview = useCallback(() => {
    const values = getValues();
    const editorContent = getContent();

    const src = disable.localImg
      ? cloudImg
      : disable.cloudImg
      ? localImg && localImg[0]
        ? URL.createObjectURL(localImg[0] as File)
        : ""
      : "";

    // Set preview value
    setPreviewData({
      ...initPost,
      title: values.title,
      cloudImg: src,
      localImg: src,
      content: editorContent ? editorContent : "",
    });
  }, [getValues, getContent, localImg, cloudImg, disable]);

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
    router.push(`/`);
  }, [router]);

  /** Depend on clear upload image process */
  useEffect(() => {
    if (isClearedUploadProcced) {
      setValue("localImg", []);
      setValue("cloudImg", "");
    }
  }, [isClearedUploadProcced, setValue]);

  console.log({ response });

  /** Handle check response from Api */
  useEffect(() => {
    if (response) {
      hideLoader();
      // If api return errors
      if (response.message === Constants.ResponseStat.Error) {
        showToast("error", response.error);
        return;
      }

      // Redirect to homepage on success
      showToast("success", d("post.successs"));
      showLoader(d("loader.processing"));
      router.push(`/post/${response.data._id}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

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
            <PostDetailView post={previewData} view="preview" />
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
