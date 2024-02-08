import React from "react";
import Image from "next/image";

type Props = {
  images: File[];
};

export default function ImagePreview({ images }: Props) {
  console.log({ images });
  const src = URL.createObjectURL(images[0]);
  return (
    <div>
      <div className="grid grid-cols-12 gap-2 my-2">
        <div className="relative aspect-video col-span-4" key={images[0].name}>
          <Image src={src} alt={images[0].name} className="object-cover" fill />
        </div>
      </div>
    </div>
  );
}
