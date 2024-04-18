// app/post/[slug]/page.tsx

import { Suspense } from "react";
import { Metadata } from "next";
import { getPost } from "@/actions";
import { PostViewLoader } from "../../loader";
import PostDetail from "@/common/ui/post";
import Main from "@/common/ui/main";

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
    <Suspense
      fallback={
        <Main>
          <PostViewLoader />
        </Main>
      }
    >
      {post && (
        <Main id={post._id} coverImgFileId={post.coverImgFileId}>
          <PostDetail post={post} />
        </Main>
      )}
    </Suspense>
  );
}
