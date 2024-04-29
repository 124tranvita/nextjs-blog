// hooks/useUploadImage.tsx
"use client";

import { useCallback, useEffect, useState } from "react";
import { ImagePreviewMain } from "../components/image-preview";

export default function useImageUpload({ cloudImg = "", localImg = "" }) {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [isShowPreImage, setIsShowPreImage] = useState<boolean>(false);
  const [isLoadingImg, setIsLoadingImg] = useState<boolean>(false);
  const [isClearedUploadProcced, setIsClearedUploadProcced] =
    useState<boolean>(false);

  /** Fetch image data from google drive if `googleFileId` is provided */
  useEffect(() => {
    // No run if not have prev image source
    if (!cloudImg && !localImg) return;

    // Display image preview screen
    setIsShowPreImage(true);

    // If `localImg`: Set `imageUrl` as google drive url based on file Id
    if (localImg) {
      const url = process.env.NEXT_PUBLIC_GOOGLE_IMG_URL
        ? process.env.NEXT_PUBLIC_GOOGLE_IMG_URL.replace("<IMAGEURL>", localImg)
        : "";

      return setImageUrl(url);
    }

    setImageUrl(cloudImg);
  }, [cloudImg, localImg]);

  /** Refresh all data to init when `X` button is clicked */
  const proccessClearData = useCallback(() => {
    setIsShowPreImage(false);
    setImageUrl("");
    setIsClearedUploadProcced(true);
  }, []);

  /** Process image data with provided value */
  const processImageData = useCallback(
    (value: Blob | File | string | undefined) => {
      setIsClearedUploadProcced(false);

      if (typeof value === "string") {
        setImageUrl(value);
        setIsShowPreImage(true);
      } else {
        const url = URL.createObjectURL(value as File);
        setImageUrl(url);
        setIsShowPreImage(true);
      }
    },
    []
  );

  /** Image preview component */
  const ImagePreview = (
    <>
      {imageUrl && isShowPreImage && (
        <ImagePreviewMain
          src={imageUrl}
          proccessClearData={proccessClearData}
          setIsLoadingImg={setIsLoadingImg}
        />
      )}
    </>
  );

  return {
    processImageData,
    ImagePreview,
    isClearedUploadProcced,
    isLoadingImg,
  };
}
