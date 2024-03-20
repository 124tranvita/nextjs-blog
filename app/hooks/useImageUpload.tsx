// app/hooks/useUploadImage.tsx
"use client";

import { useCallback, useEffect, useState } from "react";
import { fetchImage } from "../actions";
import * as Utils from "@/app/lib/utils";
import useUnchanged from "./useUnchanged";
import * as ImagePreviewComponent from "@/components/image-preview";
import { downloadFile } from "../lib/google-drive";

export default function useImageUpload(googleFileId: string = "") {
  const { isUnChanged, setInitUnChangeValue } = useUnchanged();
  const [isClearedUploadProcced, setIsClearedUploadProcced] =
    useState<boolean>(false);

  const [cloudImgUrl, setCloudImgUrl] = useState<string>("");
  const [imageData, setImageData] = useState<Blob | File | undefined>(
    undefined
  );
  const [isShowPreImage, setIsShowPreImage] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  /** Fetch image data from google drive if `googleFileId` is provided */
  useEffect(() => {
    // No run if not have `googleFileId`
    if (!googleFileId) return;

    // Display image preview screen
    setIsShowPreImage(true);

    // Get file from Google drive function
    const getFile = async (fileId: string) => {
      try {
        const res = await downloadFile(fileId);

        if (res) {
          const imgData = Utils.base64ToBlob(res.base64, res.type);
          setImageData(imgData);
        }
      } catch (error: any) {
        setError(error.message);
      }
    };

    getFile(googleFileId);
  }, [googleFileId]);

  /** If cloud image's url is provided, run this useEffect to fetch online image data */
  useEffect(() => {
    // No run if not have `cloudImgUrl`
    if (!cloudImgUrl) return;

    // If new provided url similar with previous url
    if (isUnChanged(cloudImgUrl)) return;

    setError("");
    setImageData(undefined);

    // Fecth image data function
    const getImage = async () => {
      try {
        const base64Img = await fetchImage(cloudImgUrl);
        const imgData = Utils.base64ToBlob(base64Img, "image/jpeg") as File;
        setImageData(imgData);
      } catch (error: any) {
        setError(error.message);
      }
    };

    // Run fecth data function
    getImage();
  }, [cloudImgUrl, isUnChanged]);

  /** Refresh all data to init when `X` button is clicked */
  const proccessClearData = useCallback(() => {
    setIsShowPreImage(false);
    setIsShowPreImage(false);
    setImageData(undefined);
    setError("");
    setCloudImgUrl("");
    setInitUnChangeValue();
    setIsClearedUploadProcced(true);
  }, [setInitUnChangeValue]);

  /** Process image data with provided value */
  const processImageData = useCallback(
    (value: Blob | File | string | undefined) => {
      setIsClearedUploadProcced(false);

      if (typeof value === "string") {
        setCloudImgUrl(value);
        setIsShowPreImage(true);
      } else {
        setImageData(value);
        setIsShowPreImage(true);
      }
    },
    []
  );

  /** Image preview component */
  const ImagePreview = (
    <>
      {!imageData && !error && isShowPreImage && (
        <ImagePreviewComponent.ImagePreviewLoading />
      )}
      {!imageData && error && (
        <ImagePreviewComponent.ImagePreviewError
          error={error}
          proccessClearData={proccessClearData}
        />
      )}
      {imageData && isShowPreImage && (
        <ImagePreviewComponent.ImagePreviewMain
          imageData={imageData as File}
          proccessClearData={proccessClearData}
        />
      )}
    </>
  );

  return {
    processImageData,
    ImagePreview,
    imageData,
    isClearedUploadProcced,
  };
}
