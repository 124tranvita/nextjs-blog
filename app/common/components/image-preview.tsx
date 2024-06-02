// @/components/image-preview.tsx
"use client";
import React, {
  Dispatch,
  SetStateAction,
  SyntheticEvent,
  useCallback,
} from "react";
import Image from "next/image";
import { XMarkIcon } from "@heroicons/react/20/solid";
import ImagePreviewLoadingSkeleton from "./loading-skeleton/image-preview-loading-skeleton";

type Props = {
  src: string;
  proccessClearData: () => void;
  setIsLoadingImg: Dispatch<SetStateAction<boolean>>;
  error: string;
};

/** Image preview main screen
 * @param imageData - Image data
 * @param proccessClearData - Clear data function (apply to `x` button)
 */
export function ImagePreviewMain({
  src = "",
  proccessClearData,
  setIsLoadingImg,
}: Pick<Props, "src" | "proccessClearData" | "setIsLoadingImg">) {
  const onLoadCallback = useCallback(
    (e: SyntheticEvent<HTMLImageElement, Event>) => {
      setIsLoadingImg(true);

      if (e.target) {
        setIsLoadingImg(false);
      }
    },
    [setIsLoadingImg]
  );

  return (
    <div className="grid grid-cols-12 gap-2 my-2">
      <div className="relative aspect-video col-span-4">
        <Image
          src={src}
          alt="preview image"
          className="object-cover"
          sizes="100vw"
          fill={true}
          onLoad={onLoadCallback}
          style={{ objectFit: "cover" }}
          blurDataURL="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+PHN2ZyB4bWxuczpzdmc9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjAiIHdpZHRoPSI2NHB4IiBoZWlnaHQ9IjY0cHgiIHZpZXdCb3g9IjAgMCAxMjggMTI4IiB4bWw6c3BhY2U9InByZXNlcnZlIj48Zz48cGF0aCBkPSJNNzEgMzkuMlYuNGE2My42IDYzLjYgMCAwIDEgMzMuOTYgMTQuNTdMNzcuNjggNDIuMjRhMjUuNTMgMjUuNTMgMCAwIDAtNi43LTMuMDN6IiBmaWxsPSIjMDAwIi8+PHBhdGggZD0iTTcxIDM5LjJWLjRhNjMuNiA2My42IDAgMCAxIDMzLjk2IDE0LjU3TDc3LjY4IDQyLjI0YTI1LjUzIDI1LjUzIDAgMCAwLTYuNy0zLjAzeiIgZmlsbD0iI2UxZTFlMSIgdHJhbnNmb3JtPSJyb3RhdGUoNDUgNjQgNjQpIi8+PHBhdGggZD0iTTcxIDM5LjJWLjRhNjMuNiA2My42IDAgMCAxIDMzLjk2IDE0LjU3TDc3LjY4IDQyLjI0YTI1LjUzIDI1LjUzIDAgMCAwLTYuNy0zLjAzeiIgZmlsbD0iI2UxZTFlMSIgdHJhbnNmb3JtPSJyb3RhdGUoOTAgNjQgNjQpIi8+PHBhdGggZD0iTTcxIDM5LjJWLjRhNjMuNiA2My42IDAgMCAxIDMzLjk2IDE0LjU3TDc3LjY4IDQyLjI0YTI1LjUzIDI1LjUzIDAgMCAwLTYuNy0zLjAzeiIgZmlsbD0iI2UxZTFlMSIgdHJhbnNmb3JtPSJyb3RhdGUoMTM1IDY0IDY0KSIvPjxwYXRoIGQ9Ik03MSAzOS4yVi40YTYzLjYgNjMuNiAwIDAgMSAzMy45NiAxNC41N0w3Ny42OCA0Mi4yNGEyNS41MyAyNS41MyAwIDAgMC02LjctMy4wM3oiIGZpbGw9IiNiZWJlYmUiIHRyYW5zZm9ybT0icm90YXRlKDE4MCA2NCA2NCkiLz48cGF0aCBkPSJNNzEgMzkuMlYuNGE2My42IDYzLjYgMCAwIDEgMzMuOTYgMTQuNTdMNzcuNjggNDIuMjRhMjUuNTMgMjUuNTMgMCAwIDAtNi43LTMuMDN6IiBmaWxsPSIjOTc5Nzk3IiB0cmFuc2Zvcm09InJvdGF0ZSgyMjUgNjQgNjQpIi8+PHBhdGggZD0iTTcxIDM5LjJWLjRhNjMuNiA2My42IDAgMCAxIDMzLjk2IDE0LjU3TDc3LjY4IDQyLjI0YTI1LjUzIDI1LjUzIDAgMCAwLTYuNy0zLjAzeiIgZmlsbD0iIzZlNmU2ZSIgdHJhbnNmb3JtPSJyb3RhdGUoMjcwIDY0IDY0KSIvPjxwYXRoIGQ9Ik03MSAzOS4yVi40YTYzLjYgNjMuNiAwIDAgMSAzMy45NiAxNC41N0w3Ny42OCA0Mi4yNGEyNS41MyAyNS41MyAwIDAgMC02LjctMy4wM3oiIGZpbGw9IiMzYzNjM2MiIHRyYW5zZm9ybT0icm90YXRlKDMxNSA2NCA2NCkiLz48YW5pbWF0ZVRyYW5zZm9ybSBhdHRyaWJ1dGVOYW1lPSJ0cmFuc2Zvcm0iIHR5cGU9InJvdGF0ZSIgdmFsdWVzPSIwIDY0IDY0OzQ1IDY0IDY0OzkwIDY0IDY0OzEzNSA2NCA2NDsxODAgNjQgNjQ7MjI1IDY0IDY0OzI3MCA2NCA2NDszMTUgNjQgNjQiIGNhbGNNb2RlPSJkaXNjcmV0ZSIgZHVyPSI3MjBtcyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiPjwvYW5pbWF0ZVRyYW5zZm9ybT48L2c+PGc+PGNpcmNsZSBmaWxsPSIjMDAwIiBjeD0iNjMuNjYiIGN5PSI2My4xNiIgcj0iMTIiLz48YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJvcGFjaXR5IiBkdXI9IjcyMG1zIiBiZWdpbj0iMHMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiBrZXlUaW1lcz0iMDswLjU7MSIgdmFsdWVzPSIxOzA7MSIvPjwvZz48L3N2Zz4="
          placeholder="blur"
        />
        <XMarkIcon
          onClick={proccessClearData}
          className="absolute z-10 -right-10 w-6 h-6 text-gray-50 bg-red-500 rounded-md hover:bg-red-600 duration-300 cursor-pointer"
        />
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
