"use client";

import { PencilIcon, TrashIcon } from "@heroicons/react/20/solid";
import PostHeader from "@/app/lib/components/post-header";
import { Post } from "@/app/lib/model";
import { createMarkup } from "@/app/lib/utils";
import { deletePost } from "@/app/actions";
import { FloatIconWithTooltip } from "@/app/lib/components/button";
import PostContent from "@/app/lib/components/post-content";

type Props = {
  post: Post;
};

export default function PostDetail({ post }: Props) {
  const { title, content, cover, createdAt, updatedAt, _id, author } = post;
  return (
    <section className="mb-12">
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
