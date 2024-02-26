"use client";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import React, { FC, useCallback, useMemo, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  PostPreview as PostPreviewType,
  initPostPreview,
} from "@/app/lib/model";
import { createPost, fetchImage, uploadImg } from "@/app/actions";
import { Button } from "@/app/ui/button";
import Input from "@/components/react-hook-form/input";
import ScrollableDialog from "@/components/scrollable-dialog";
import PostPreview from "@/components/post/post-review";
import FileSelector from "@/components/react-hook-form/file-selector";
import ImagePreview from "@/components/image-upload/image-preview";
import { base64ToBlob, blobToBinary } from "@/app/lib/utils";

/**
 * Import JoitEditor
 */
const JoditEditor = dynamic(
  () => {
    return import("@/components/jodit-editor");
  },
  { ssr: false }
);

/**
 * Declare react-hook-form type
 */
type Inputs = {
  title: string;
  cloudImg: string;
  localImage: File[];
};

/**
 * Create new post component
 * @returns - NewPost Component
 */
const NewPost: FC = () => {
  const router = useRouter();
  const editorRef = useRef<any>(null);
  const [imgData, setImgData] = useState<Blob | undefined>(undefined);
  const [previewData, setPreviewData] =
    useState<PostPreviewType>(initPostPreview);
  const {
    handleSubmit,
    register,
    getValues,
    setValue,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const [cloudImg] = watch(["cloudImg"]);
  const [localImage] = watch(["localImage"]);

  /**
   * Disable flag for Cover image input
   */
  const disable = useMemo(() => {
    return {
      cloudImg: Boolean(localImage && localImage.length > 0),
      localImage: Boolean(cloudImg),
    };
  }, [cloudImg, localImage]);

  /**
   * Handle submit new post
   * @param data - Input form's data
   */
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const formData = new FormData();

    if (editorRef.current) {
      formData.append("title", data.title);
      formData.append("cover", imgData as Blob);
      formData.append("content", editorRef.current);
      formData.append("author", "Author");

      createPost(formData);
    }
  };

  /** Handle editor onInit event */
  const onBlur = useCallback((newContent: string) => {
    editorRef.current = newContent;
  }, []);

  /** Handle preview event */
  const onPreview = useCallback(() => {
    const values = getValues();
    setPreviewData({
      title: values.title,
      cover: imgData ? (URL.createObjectURL(imgData) as string) : "",
      content: editorRef.current ? editorRef.current : "",
    });
  }, [getValues, imgData]);

  /**
   * Hanlde fetch the image from the input url and show in preview.
   * @param value - Cover Image input value
   */
  const onBlurCoverImgInput = useCallback(async (value: string) => {
    try {
      if (!value) {
        return setImgData(undefined);
      }
      const base64Img = await fetchImage(value);
      setImgData(base64ToBlob(base64Img, "image/jpeg"));
    } catch (error) {
      console.error(error);
    }
  }, []);

  /**
   * Hanlde get the image from the choosen file and show in preview.
   * @param value - Choose image value
   */
  const onChangeFileSelector = useCallback(async (value: FileList | null) => {
    try {
      if (!value) {
        return setImgData(undefined);
      }
      const uploadedImg = value && value.length > 0 ? value[0] : undefined;
      setImgData(uploadedImg);
    } catch (error) {
      console.error(error);
    }
  }, []);

  /**
   * Handle to clear the image in preview
   */
  const onClearPreviewImg = useCallback(() => {
    setValue("localImage", []);
    setValue("cloudImg", "");
    setImgData(undefined);
  }, [setValue]);

  /** Handle back event */
  const hanldeBack = useCallback(() => {
    router.push(`/`);
  }, [router]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
      <div className="mb-3">
        <Input
          label="Title"
          placeholder="Title"
          errors={errors}
          {...register("title", {
            required: "Title is required.",
            maxLength: 128,
          })}
        />
      </div>
      <div className="mb-3">
        <Input
          label="Cover Image"
          placeholder="Cover Url"
          errors={errors}
          {...register("cloudImg", {
            maxLength: 128,
            onBlur: (e) => onBlurCoverImgInput(e.target.value),
            validate: (value) =>
              value ||
              (!value &&
                getValues().localImage &&
                getValues().localImage.length > 0)
                ? true
                : "Cover Image is required",
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
      <div className="mb-3">
        {imgData && (
          <ImagePreview image={imgData as File} onClick={onClearPreviewImg} />
        )}
      </div>
      <div className="mt-6">
        <JoditEditor onBlur={onBlur} placeholder="Start typing..." />
      </div>
      <div>
        <ScrollableDialog btnLabel="Preview" title="Post Preview">
          <PostPreview previewData={previewData} onPreview={onPreview} />
        </ScrollableDialog>
      </div>
      <Button variant="primary" type="submit" label="Submit" fullWidth />
      <Button
        variant="danger"
        type="button"
        label="Back"
        fullWidth
        onClick={hanldeBack}
      />
    </form>
  );
};

export default NewPost;
