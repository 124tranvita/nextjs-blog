// app/components/common/contianer.tsx
"use client";

import { createMarkup } from "@/common/lib/utils";
import {
  ComponentPropsWithRef,
  FC,
  ForwardedRef,
  ReactNode,
  forwardRef,
} from "react";

interface Props extends ComponentPropsWithRef<"section"> {
  children: ReactNode;
}

type Ref = ForwardedRef<HTMLDivElement>;

export const Container: FC<Props> = ({ children }) => {
  return (
    <section className="relative lg:mt-[75px] overflow-y-scroll">
      {children}
    </section>
  );
};

export const Article = forwardRef(function (props: Props, ref: Ref): ReactNode {
  const { children } = props;
  return (
    <>
      <section
        className="relative max-w-screen-md mx-auto py-8 pb-0 px-4 md:px-8"
        ref={ref}
      >
        {children}
      </section>
    </>
  );
});

export const EditorContainer: FC<Props> = ({ children }) => {
  return (
    <>
      <section className="relative max-w-screen-lg mx-auto my-12">
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

export const Content: FC<{ content: string }> = ({ content }) => {
  return (
    <div className="block antialiased font-sans text-base leading-relaxed font-normal my-4">
      <article
        className="max-w-full m-0 mx-auto prose prose-slate lg:prose-lg dark:prose-invert"
        dangerouslySetInnerHTML={createMarkup(content)}
      />
    </div>
  );
};

Article.displayName = "Article";
