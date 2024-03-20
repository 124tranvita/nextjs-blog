// @/components/image-preview.tsx
"use client";
import React from "react";
import Image from "next/image";
import { XMarkIcon } from "@heroicons/react/20/solid";
import ImagePreviewLoadingSkeleton from "./loading-skeleton/image-preview-loading-skeleton";

type Props = {
  imageData: File;
  proccessClearData: () => void;
  error: string;
};

/** Image preview main screen
 * @param imageData - Image data
 * @param proccessClearData - Clear data function (apply to `x` button)
 */
export function ImagePreviewMain({
  imageData,
  proccessClearData,
}: Pick<Props, "imageData" | "proccessClearData">) {
  const src = URL.createObjectURL(imageData);

  return (
    <div>
      <div className="grid grid-cols-12 gap-2 my-2">
        <div
          className="relative aspect-video col-span-4"
          key={imageData.name || "cloudImg"}
        >
          <Image
            src={URL.createObjectURL(imageData)}
            alt={imageData.name || "cloudImg"}
            className="object-cover"
            fill
          />
          <XMarkIcon
            onClick={proccessClearData}
            className="absolute z-10 -right-10 w-6 h-6 text-gray-50 bg-red-500 rounded-md hover:bg-red-600 duration-300 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}

/** Image preview loading screen */
export function ImagePreviewLoading() {
  return (
    <div>
      <div className="grid grid-cols-12 gap-2 my-2">
        <div className="relative aspect-video col-span-4">
          <ImagePreviewLoadingSkeleton />
        </div>
      </div>
    </div>
  );
}

/** Image preview error screen
 * @param error - Error message
 * @param proccessClearData - Clear data function (apply to `x` button)
 */
export function ImagePreviewError({
  error,
  proccessClearData,
}: Pick<Props, "error" | "proccessClearData">) {
  return (
    <div>
      <div className="grid grid-cols-12 gap-2 my-2">
        <div className="relative aspect-video col-span-4 bg-slate-100 rounded-md">
          <p className="absolute top-4 left-4 text-red-500">{error}</p>
          <XMarkIcon
            onClick={proccessClearData}
            className="absolute z-10 -right-10 w-6 h-6 text-gray-50 bg-red-500 rounded-md hover:bg-red-600 duration-300 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}
