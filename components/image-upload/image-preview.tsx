import React from "react";
import Image from "next/image";
import { XMarkIcon } from "@heroicons/react/20/solid";

type Props = {
  image: File;
  onClick?: () => void;
};

export default function ImagePreview({ image, onClick }: Props) {
  const src = URL.createObjectURL(image);
  console.log({ src, image });
  return (
    <div>
      <div className="grid grid-cols-12 gap-2 my-2">
        <div
          className="relative aspect-video col-span-4"
          key={image.name || "cloudImg"}
        >
          <Image
            src={src}
            alt={image.name || "cloudImg"}
            className="object-cover"
            fill
          />
          <XMarkIcon
            onClick={onClick}
            className="absolute z-50 -right-10 w-6 h-6 text-gray-50 bg-red-500 rounded-md hover:bg-red-600 duration-300 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}
