// app/components/common/contianer.tsx
"use client";

import { ComponentPropsWithRef, FC, ReactNode } from "react";
import Image, { StaticImageData } from "next/image";
import classNames from "classnames";
import { createMarkup } from "@/app/common/lib/utils";
import { BLUR_DATA_URL } from "@/app/common/lib/constants";
import { Link } from "../custom-link";

interface Props extends ComponentPropsWithRef<"section"> {
  children: ReactNode;
  width?: "small" | "medium" | "full";
}

export const Container: FC<Props> = ({ children }) => {
  return (
    <section className="relative overflow-y-scroll bg-slate-50 dark:bg-slate-800 pb-[10rem]">
      {children}
    </section>
  );
};

export const Article: FC<Props> = ({ children, width = "full" }) => {
  const SizeMap = {
    full: "max-w-screen h-screen",
    medium: "max-w-screen-md mt-[3rem]",
    small: "max-w-screen-sm mt-[2rem]",
  };

  return (
    <>
      <section
        className={classNames(
          "relative mx-auto mb-[25px] bg-slate-50 dark:bg-slate-800",
          SizeMap[width]
        )}
      >
        {children}
      </section>
    </>
  );
};

export const EditorContainer: FC<Props> = ({ children }) => {
  return (
    <>
      <section className="relative max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg mx-auto my-12">
        {children}
      </section>
    </>
  );
};

export const Form: FC<Props> = ({ children }) => {
  return (
    <>
      <section className="relative max-w-sm mx-auto my-12">{children}</section>
    </>
  );
};

export const Content: FC<{ content: string; width?: "half" | "full" }> = ({
  content,
  width = "full",
}) => {
  const SizeMap = {
    full: "max-w-screen",
    half: "max-w-screen-md",
  };
  return (
    <div
      className={classNames(
        "block antialiased font-sans text-base leading-relaxed font-normal my-4 mx-auto",
        SizeMap[width]
      )}
    >
      <article
        className="max-w-full m-0 mx-auto p-4 md:p-0 prose prose-slate lg:prose-lg dark:prose-invert"
        dangerouslySetInnerHTML={createMarkup(content)}
      />
    </div>
  );
};

export const IconWithText: FC<{ icon: ReactNode; value: string }> = ({
  icon,
  value,
}) => {
  return (
    <div className="mr-2 flex items-center text-sm text-slate-600 dark:text-slate-400">
      {icon}
      {value}
    </div>
  );
};

export const IconWithTextWrapper: FC<{ children: ReactNode }> = ({
  children,
}) => {
  return (
    <div className="mt-1 flex sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
      {children}
    </div>
  );
};

type PostHeaderWrapperProps = {
  title: string;
  imgSrc: string | StaticImageData;
  postInfo: ReactNode;
  view: "home" | "detail" | "preview";
  pathName: string;
  reactArea?: ReactNode;
  imgAlt?: string;
};

export const PostHeaderWrapper: FC<PostHeaderWrapperProps> = ({
  title,
  imgSrc,
  postInfo,
  view = "home",
  pathName = "",
  imgAlt,
  reactArea,
}) => {
  const ViewMapping1 = {
    home: "bg-gradient-classic-dark",
    detail:
      "[height:_calc(100%_-_100px)] bg-gradient-classic-light dark:bg-gradient-classic-dark",
    preview:
      "[height:_calc(100%_-_100px)] bg-gradient-classic-light dark:bg-gradient-classic-dark",
  };

  const ViewMapping2 = {
    home: "mx-0 [&>*]:text-gray-100",
    detail: "mx-auto [&>*]:text-gray-800 dark:[&>*]:text-gray-200",
    preview: "mx-auto [&>*]:text-gray-800 dark:[&>*]:text-gray-200",
  };
  return (
    <div className="relative max-w-full mb-[1rem] overflow-hidden h-[312px] md:h-[412px] lg:h-[512px]">
      {reactArea ? reactArea : <></>}
      <Link href={pathName}>
        {/* title area */}
        <div
          className={classNames(
            "absolute z-10 bottom-0 top-auto left-0 p-4 pt-[3rem] flex flex-col justify-center w-full",
            ViewMapping1[view]
          )}
        >
          <div className={classNames("max-w-screen-md", ViewMapping2[view])}>
            <p className="font-bold mb-2 text-3xl md:text-4xl">{title}</p>
          </div>
          {postInfo}
        </div>
        {/* image area */}
        <Image
          src={imgSrc}
          alt={`${imgAlt}_image`}
          fill={true}
          sizes="100vw"
          style={{ objectFit: "cover" }}
          blurDataURL={BLUR_DATA_URL}
          placeholder="blur"
        />
      </Link>
    </div>
  );
};

// https://www.hyperui.dev/blog/text-shadow-with-tailwindcss
