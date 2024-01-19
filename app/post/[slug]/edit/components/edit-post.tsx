"use client";
import dynamic from "next/dynamic";
import React, { FC, useCallback, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input, Button, Typography } from "@material-tailwind/react";
import LongDialog from "@/components/dialog";
import PostPreview from "@/components/post-preview";
import {
  Inputs,
  PostPreview as PostPreviewType,
  initPostPreview,
} from "@/common/types";

type Props = {
  title: string;
  cover: string;
  content: string;
};

const TinyEditor = dynamic(
  () => {
    return import("@/components/tiny-editor");
  },
  { ssr: false }
);

const EditPost: FC<PostPreviewType> = ({ title, cover, content }) => {
  const editorRef = useRef<any>(null);
  const [previewData, setPreviewData] =
    useState<PostPreviewType>(initPostPreview);
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      title,
      cover,
    },
  });

  /** Handle submit */
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (editorRef.current) {
      const post = {
        title: data.title,
        cover: data.cover,
        content: editorRef.current.getContent(),
      };
      localStorage.setItem("post", JSON.stringify({ ...post }));
    }
  };

  /** Handle editor onInit event */
  const onInit = useCallback((event: any, editor: any) => {
    editorRef.current = editor;
  }, []);

  /** Handle preview event */
  const onPreview = useCallback(() => {
    const values = getValues();
    setPreviewData({
      title: values.title,
      cover: values.cover,
      content: editorRef.current ? editorRef.current.getContent() : "",
    });
  }, [getValues]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <Typography variant="h6" color="blue-gray" className="mb-1">
            Title
          </Typography>
          <Input
            type="text"
            size="lg"
            placeholder="Title"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900 bg-white"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            {...register("title", { required: true, maxLength: 128 })}
          />
        </div>
        <div className="mb-3">
          <Typography variant="h6" color="blue-gray">
            Cover
          </Typography>
          <Input
            type="text"
            size="lg"
            placeholder="Image"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900 bg-white"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            {...register("cover", { required: true })}
          />
        </div>
        <div className="mt-6">
          <TinyEditor initialValue={content} onInit={onInit} />
        </div>
        <div>
          <LongDialog btnLabel="Preview" title="Post Preview">
            <PostPreview previewData={previewData} onPreview={onPreview} />
          </LongDialog>
        </div>
        <Button type="submit" className="mt-6" fullWidth>
          Save
        </Button>
      </form>
    </>
  );
};

export default EditPost;
