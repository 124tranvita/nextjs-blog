"use client";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import React, { FC, useCallback, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { PostPreview as PostPreviewType } from "@/app/lib/model";
import { createPost, uploadImg } from "@/app/actions";
import { Button } from "@/app/ui/button";
import Input from "@/components/react-hook-form/input";
import ScrollableDialog from "@/components/scrollable-dialog";
import PostPreview from "@/components/post/post-review";
import FileSelector from "@/components/react-hook-form/file-selector";
import ImagePreview from "@/components/image-upload/image-preview";

const JoditEditor = dynamic(
  () => {
    return import("@/components/jodit-editor");
  },
  { ssr: false }
);

type Inputs = {
  title: string;
  coverUrl: string;
  coversUpload: File[];
};

const NewPost: FC = () => {
  const router = useRouter();
  const editorRef = useRef<any>(null);
  const [previewData, setPreviewData] = useState<PostPreviewType>({
    title: "",
    cover: "",
    content: "",
  });
  const {
    handleSubmit,
    register,
    getValues,
    setValue,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const [coverUrl] = watch(["coverUrl"]);
  const [coversUpload] = watch(["coversUpload"]);

  /** Handle submit */
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const formData = new FormData();

    if (editorRef.current) {
      formData.append("title", data.title);
      formData.append(
        "cover",
        coversUpload && coversUpload.length > 0
          ? coversUpload[0].name
          : coverUrl
      );
      formData.append("content", editorRef.current);
      formData.append("author", "Author");

      createPost(formData);

      if (coversUpload && coversUpload.length > 0) {
        const formData = new FormData();
        for (const file of Array.from(coversUpload ?? [])) {
          formData.append(file.name, file);
        }

        uploadImg(formData);
      }
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
      cover:
        coversUpload && coversUpload.length > 0
          ? (URL.createObjectURL(coversUpload[0]) as string)
          : coverUrl
          ? coverUrl
          : "",
      content: editorRef.current ? editorRef.current : "",
    });
  }, [getValues, coverUrl, coversUpload]);

  const onClearUploadImg = useCallback(() => {
    setValue("coversUpload", []);
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
          {...register("coverUrl", {
            maxLength: 128,
            validate: (value) =>
              value ||
              (!value &&
                getValues().coversUpload &&
                getValues().coversUpload.length > 0)
                ? true
                : "Cover Image is required",
          })}
          disabled={Boolean(coversUpload && coversUpload.length > 0)}
        />
      </div>
      <div className="mb-3">
        <FileSelector errors={errors} {...register("coversUpload")} />
        {coversUpload && coversUpload.length > 0 && (
          <ImagePreview images={coversUpload} onClick={onClearUploadImg} />
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
