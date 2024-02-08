"use client";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import React, { FC, useCallback, useRef, useState } from "react";
import { SubmitHandler, useForm, FormProvider } from "react-hook-form";
import { Post } from "@/app/lib/model";
import { createPost } from "@/app/actions";
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
  cover: File[];
};

const NewPost: FC = () => {
  const router = useRouter();
  const editorRef = useRef<any>(null);
  const [previewData, setPreviewData] = useState<
    Pick<Post, "title" | "cover" | "content">
  >({
    title: "",
    cover: "",
    content: "",
  });
  const {
    handleSubmit,
    register,
    getValues,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const [cover] = watch(["cover"]);

  console.log(cover);

  /** Handle submit */
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (editorRef.current) {
      const post = {
        title: data.title,
        cover: data.cover,
        content: editorRef.current,
        author: "Author",
      };
      localStorage.setItem("post", JSON.stringify({ ...post }));
      // createPost(post);
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
      cover: "",
      content: editorRef.current ? editorRef.current : "",
    });
  }, [getValues]);

  /** Handle back event */
  const hanldeBack = useCallback(() => {
    router.push(`/`);
  }, [router]);

  // {...register(name, { ...options })}

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
        <FileSelector
          label="Cover Image"
          errors={errors}
          {...register("cover", {
            required: "Cover Image is required.",
          })}
        />
        {cover && cover.length > 0 && <ImagePreview images={cover} />}
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
