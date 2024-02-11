import React from "react";
import Image from "next/image";
import { XMarkIcon } from "@heroicons/react/20/solid";

type Props = {
  images: File[];
  onClick?: () => void;
};

export default function ImagePreview({ images, onClick }: Props) {
  const src = URL.createObjectURL(images[0]);
  return (
    <div>
      <div className="grid grid-cols-12 gap-2 my-2">
        <div className="relative aspect-video col-span-4" key={images[0].name}>
          <Image src={src} alt={images[0].name} className="object-cover" fill />
          <XMarkIcon
            onClick={onClick}
            className="absolute z-50 -right-10 w-6 h-6 text-gray-50 bg-red-500 rounded-md hover:bg-red-600 duration-300 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}
