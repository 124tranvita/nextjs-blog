"use client";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CalendarIcon, PencilIcon, UserIcon } from "@heroicons/react/20/solid";
import { Post } from "@/common/lib/model";
import { base64ToBlob, formatDate } from "@/common/lib/utils";
import { downloadFile } from "@/app/lib/google-drive";
import useDictionary from "@/common/hooks/useDictionary";
import ImageLoadingSkeleton from "../loading-skeleton/image-loading-skeleton";
import PostReact from "./post-react";

import noImagePlaceholder from "../../public/no-image-placeholder.webp";
import useScreenPath from "@/common/hooks/useScreenPath";
import Typography from "@/app/components/common/typography";

type Props = Pick<
  Post,
  "_id" | "author" | "coverImgFileId" | "title" | "createdAt" | "updatedAt"
> & { onClick?: () => void };

export default function PostHeader({
  _id,
  author,
  coverImgFileId,
  title,
  createdAt,
  updatedAt,
  onClick,
}: Props) {
  const { lang } = useDictionary();
  const { nextPathName } = useScreenPath();
  const [coverImg, setCoverImg] = useState<Blob | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const pathName = useMemo(() => {
    return nextPathName(`/post/${_id}`);
  }, [_id, nextPathName]);

  /** Create object url */
  const createObjectURL = useMemo(() => {
    return coverImg ? URL.createObjectURL(coverImg) : noImagePlaceholder;
  }, [coverImg]);

  /** Download imge file from Google drive */
  useEffect(() => {
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
    <section className="relative w-full">
      <PostReact />
      {isLoading ? (
        <>
          <ImageLoadingSkeleton />
        </>
      ) : (
        <Link href={pathName} onClick={onClick}>
          <div className="relative max-w-full mb-8 rounded-md overflow-hidden h-[312px] md:h-[412px] lg:h-[512px]">
            <Image
              src={createObjectURL}
              alt={`${title}_image`}
              fill={true}
              sizes="100vw"
              style={{ objectFit: "cover" }}
            />
          </div>
        </Link>
      )}
      <div className="lg:flex lg:items-center lg:justify-between">
        <div className="min-w-0 flex-1">
          <Link href={pathName}>
            <Typography text={title} type="title" />
            <h2 className="text-3xl md:text-4xl font-bold mb-3 sm:leading-7 md:leading-9 text-gray-900 sm:text-3xl sm:tracking-tight dark:text-gray-100">
              {title}
            </h2>
          </Link>
          <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <UserIcon
                className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                aria-hidden="true"
              />
              {author}
            </div>

            <div className="mt-2 flex items-center text-sm text-gray-500">
              <CalendarIcon
                className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                aria-hidden="true"
              />
              {formatDate(createdAt)}
            </div>
            {updatedAt && (
              <div className="mt-2 flex items-center text-sm text-gray-500">
                <PencilIcon
                  className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                  aria-hidden="true"
                />
                {formatDate(updatedAt)}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
