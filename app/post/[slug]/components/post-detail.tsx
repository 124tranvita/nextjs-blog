"use client";

import Link from "next/link";
import { PencilIcon, TrashIcon } from "@heroicons/react/20/solid";
import PostHeading from "@/app/lib/components/post-heading";
import { Post } from "@/app/lib/model";
import { createMarkup } from "@/app/lib/utils";
import { deletePost } from "@/app/actions";

type Props = {
  post: Post;
};

export default function PostDetail({ post }: Props) {
  const { title, content, cover, createdAt, updatedAt, _id, author } = post;
  return (
    <section className="mb-12">
      <PostHeading
        _id={_id}
        title={title}
        cover={cover}
        createdAt={createdAt}
        updatedAt={updatedAt}
        author={author || "Author"}
      />
      <div className="block antialiased font-sans text-base leading-relaxed text-gray-700 font-normal mb-4">
        <article
          className="m-0 prose prose-slate mx-auto lg:prose-lg max-w-full"
          dangerouslySetInnerHTML={createMarkup(content)}
        />
      </div>
      <div className="fixed right-10 bottom-12 md:right-16 md:bottom-20 flex flex-col">
        <Link href={`/post/${_id}/edit`}>
          <button className="bg-blue-500 hover:bg-blue-700 text-white h-12 w-12 rounded-full shadow-lg mb-3">
            <PencilIcon
              className="m-auto h-5 w-5 flex-shrink-0 text-white"
              aria-hidden="true"
            />
          </button>
        </Link>
        <button
          className="bg-red-500 hover:bg-red-700 text-white h-12 w-12 rounded-full shadow-lg mb-3"
          onClick={() => deletePost(_id)}
        >
          <TrashIcon
            className="m-auto h-5 w-5 flex-shrink-0 text-white"
            aria-hidden="true"
          />
        </button>
      </div>
    </section>
  );
}
