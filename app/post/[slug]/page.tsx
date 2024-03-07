// app/posts/[slug]/page.tsx
import { getPost } from "@/app/actions";
import PostDetail from "./components/post-detail";
import { Metadata } from "next";
import { Main } from "@/components/common";
import { Suspense } from "react";

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
    <Main>
      <Suspense fallback={<p>Loading feed...</p>}></Suspense>
      {post && <PostDetail post={post} />}
    </Main>
  );
}
