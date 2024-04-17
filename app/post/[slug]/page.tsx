// app/post/[slug]/page.tsx

import { Suspense } from "react";
import { Metadata } from "next";
import { getPost } from "@/actions";
import { Loader } from "../../loader";
import PostDetail from "@/common/ui/post";

type Props = {
  params: { slug: string };
};

// set dynamic metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost(params.slug);

  return {
    title: post.title,
    description: post.title,
  };
}

export default async function Page({ params }: Props) {
  const post = await getPost(params.slug);

  return (
    <Suspense fallback={<Loader />}>
      {post && (
        <>
          <PostDetail post={post} />
        </>
      )}
    </Suspense>
  );
}
