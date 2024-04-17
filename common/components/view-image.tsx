// app/components/custom-image.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import ImageLoadingSkeleton from "./loading-skeleton/image-loading-skeleton";
import { downloadFile } from "../lib/google-drive";
import { base64ToBlob } from "../lib/utils";
import { Link } from "./custom-link";

import noImagePlaceholder from "../../public/no-image-placeholder.webp";

type Props = {
  src?: string;
  coverImgFileId?: string;
  pathName?: string;
  alt?: string;
};

export function ViewImage({
  src = "",
  coverImgFileId = "",
  pathName = "",
  alt = "",
}: Props) {
  const [coverImg, setCoverImg] = useState<Blob | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  /** Create object url */
  const createObjectURL = useMemo(() => {
    return coverImg ? URL.createObjectURL(coverImg) : noImagePlaceholder;
  }, [coverImg]);

  /** Download imge file from Google drive */
  useEffect(() => {
    if (!coverImgFileId) return;

    const getFile = async (fileId: string) => {
      setIsLoading(true);
      const res = await downloadFile(fileId);

      if (res) {
        setCoverImg(base64ToBlob(res.base64, res.type));
        setIsLoading(false);
      }
    };

    getFile(coverImgFileId);
  }, [coverImgFileId]);

  return (
    <>
      {isLoading ? (
        <>
          <ImageLoadingSkeleton />
        </>
      ) : (
        <Link href={pathName}>
          <div className="relative max-w-full mb-8 rounded-md overflow-hidden h-[312px] md:h-[412px] lg:h-[512px]">
            <Image
              src={src ? src : createObjectURL}
              alt={`${alt}_image`}
              fill={true}
              sizes="100vw"
              style={{ objectFit: "cover" }}
            />
          </div>
        </Link>
      )}
    </>
  );
}
