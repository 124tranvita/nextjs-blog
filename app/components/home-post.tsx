"use client";

import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, Typography } from "@material-tailwind/react";
import { createMarkup, truncateText } from "@/common/utils";
import { Post } from "@/common/model";

type Props = {
  post: Post;
};

const HomePost: FC<Props> = ({ post }) => {
  const { title, content, cover, createdAt, id } = post;
  return (
    <section className="mb-12">
      <Card className="mb-12 overflow-hidden">
        <Image
          src={cover}
          alt={`${title}_image`}
          height={0}
          width={0}
          sizes="100vw"
          style={{ width: "auto", height: "512px", objectFit: "cover" }}
        />
      </Card>
      <Link href={`/post/${id}`}>
        <Typography
          variant="h2"
          color="blue-gray"
          className="mb-2 cursor-pointer"
        >
          {title}
        </Typography>
      </Link>
      <Typography as={"span"} color="gray" className="font-normal mb-4">
        <div
          className="text-pretty text-justify"
          dangerouslySetInnerHTML={createMarkup(truncateText(content, 250))}
        />
      </Typography>
      <Typography
        color="gray"
        className="font-normal mb-4 underline cursor-pointer"
      >
        Read more
      </Typography>
      <div className="flex justify-between w-64">
        <Typography variant="small" color="gray" className="italic">
          {createdAt ? createdAt.toLocaleString() : new Date().toLocaleString()}
        </Typography>
        <Typography variant="small" color="gray" className="italic">
          By: Author
        </Typography>
      </div>
      <hr className="w-48 h-1 mx-auto my-4 bg-gray-500 border-0 rounded md:my-10 dark:bg-gray-700" />
    </section>
  );
};

export default HomePost;
