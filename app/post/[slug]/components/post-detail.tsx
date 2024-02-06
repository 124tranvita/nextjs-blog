"use client";

import dynamic from "next/dynamic";
import { PencilIcon, TrashIcon } from "@heroicons/react/20/solid";
import { Post } from "@/app/lib/model";
import { deletePost } from "@/app/actions";
import { FloatIconWithTooltip } from "@/app/ui/button";
import PostHeader from "@/components/post/post-header";
import PostReact from "@/components/post/post-react";

const PostContent = dynamic(() => import("@/components/post/post-content"), {
  ssr: false,
});

type Props = {
  post: Post;
};

export default function PostDetail({ post }: Props) {
  const { title, content, cover, createdAt, updatedAt, _id, author } = post;
  return (
    <section className="relative mb-12">
      <PostReact />
      <PostHeader
        _id={_id}
        title={title}
        cover={cover}
        createdAt={createdAt}
        updatedAt={updatedAt}
        author={author || "Author"}
      />
      <PostContent content={content} />
      <div className="fixed right-2 bottom-16 md:right-16 md:bottom-28 flex flex-col">
        <FloatIconWithTooltip
          icon={
            <>
              <PencilIcon
                className="m-auto h-5 w-5 flex-shrink-0 text-white"
                aria-hidden="true"
              />
            </>
          }
          path={`/post/${_id}/edit`}
          tooltip="Edit post"
          variant="primary"
        />
      </div>
      <div className="fixed right-2 bottom-0 md:right-16 md:bottom-12 flex flex-col">
        <FloatIconWithTooltip
          icon={
            <>
              <TrashIcon
                className="m-auto h-5 w-5 flex-shrink-0 text-white"
                aria-hidden="true"
              />
            </>
          }
          tooltip="Delete post"
          onClick={() => deletePost(_id)}
          variant="danger"
        />
      </div>
    </section>
  );
}
