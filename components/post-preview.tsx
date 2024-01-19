"use client";
import { FC, useEffect, useMemo, useState } from "react";
import { Card, Typography } from "@material-tailwind/react";
import Image from "next/image";
import * as Contants from "@/common/constants";
import { UseFormGetValues } from "react-hook-form";
import { Inputs } from "@/common/types";

type PreviewData = {
  title: string;
  cover: string;
  content: string;
};

type Props = {
  previewData: PreviewData;
  onPreview: () => void;
};

const PostPreview: FC<Props> = ({ previewData, onPreview }) => {
  useEffect(() => {
    onPreview();
  }, [onPreview]);

  useEffect(() => {
    const tinyCndUiLink = document.createElement("link");
    tinyCndUiLink.type = "text/css";
    tinyCndUiLink.rel = "stylesheet";
    tinyCndUiLink.href = process.env.NEXT_PUBLIC_TINY_CND_UI || "";
    tinyCndUiLink.crossOrigin = "anonymous";

    const tinyCndContentLink = document.createElement("link");
    tinyCndContentLink.type = "text/css";
    tinyCndContentLink.rel = "stylesheet";
    tinyCndContentLink.href = process.env.NEXT_PUBLIC_TINY_CND_CONTENT || "";
    tinyCndContentLink.crossOrigin = "anonymous";

    const style = document.createElement("style");
    style.textContent =
      "body { font-family:Helvetica,Arial,sans-serif; font-size:14px; margin:0; padding:0 }";

    const meta = document.createElement("meta");
    meta.httpEquiv = "Content-type";
    meta.content = "text/html; charset=UTF-8";

    console.log({ tinyCndUiLink });

    const setIframeContnet = (body: string) => {
      const currentIframe = document.getElementById(
        Contants.IFRAME_ID
      ) as HTMLIFrameElement;
      const iframeContainer = document.getElementById(
        Contants.IFRAME_CONTAINER_ID
      );

      if (currentIframe) {
        const iframeDocument = currentIframe.contentWindow?.document;
        if (iframeDocument) {
          console.log({ iframeDocument });
          iframeDocument.open();
          iframeDocument.write(`${body}`);
          iframeDocument.close();
          iframeDocument.head.appendChild(tinyCndUiLink);
          iframeDocument.head.appendChild(tinyCndContentLink);
          iframeDocument.head.appendChild(style);
        }
      }
      if (iframeContainer) {
        const newIframe = frames[Contants.IFRAME_ID as keyof typeof frames];
        if (newIframe !== null) {
          const iframeDocument = newIframe.document;
          iframeDocument.open();
          iframeDocument.write(`${body}`);
          iframeDocument.close();
          iframeDocument.head.appendChild(tinyCndUiLink);
          iframeDocument.head.appendChild(tinyCndContentLink);
          iframeDocument.head.appendChild(style);
        }
      }
    };
    setIframeContnet(previewData.content);
  }, [previewData]);

  return (
    <section className="max-w-screen-md mx-auto overflow-hidden">
      <Card className="mb-12 overflow-hidden">
        {previewData.cover && (
          <>
            <Image
              src={previewData.cover}
              alt={`${previewData.title}_image`}
              height={0}
              width={0}
              sizes="100vw"
              style={{ width: "auto", height: "512px", objectFit: "cover" }}
            />
          </>
        )}
      </Card>
      <Typography
        variant="h2"
        color="blue-gray"
        className="mb-2 cursor-pointer"
      >
        {previewData.title}
      </Typography>
      <iframe
        id={Contants.IFRAME_ID}
        name={Contants.IFRAME_ID}
        sandbox="allow-same-origin"
      />
    </section>
  );
};

export default PostPreview;
