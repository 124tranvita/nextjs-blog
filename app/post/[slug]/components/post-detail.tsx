"use client";
import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, Typography, Button } from "@material-tailwind/react";
import { createMarkup } from "@/common/utils";
import { Post } from "@/common/model";

type Props = {
  post: Post;
};

const PostDetail: FC<Props> = ({ post }) => {
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
        <article
          className="text-pretty text-justify"
          dangerouslySetInnerHTML={createMarkup(content)}
        />
      </Typography>
      <div className="flex justify-between w-64">
        <Typography variant="small" color="gray" className="italic">
          {createdAt.toLocaleString()}
        </Typography>
        <Typography variant="small" color="gray" className="italic">
          By: Author
        </Typography>
      </div>
      <div>
        <Link href={`/post/${id}/edit`}>
          <Button>Edit</Button>
        </Link>
      </div>
    </section>
  );
};

export default PostDetail;
