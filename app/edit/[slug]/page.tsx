// app/[lang]/posts/[slug]/page.tsx

import { Suspense } from "react";
import { Metadata } from "next";
import { getPost } from "@/actions";
import { Main } from "@/components/common";
import EditPost from "./components/edit-post";
import { NextPageLoading } from "@/app/loader";

type Props = {
  params: { slug: string };
};

// set dynamic metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost(params.slug);

  return {
    title: `Edit - ${post.title}`,
    description: post.title,
  };
}

export default async function Page({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);

  return (
    <Suspense fallback={<NextPageLoading />}>
      <Main>
        {post && (
          <>
            <EditPost post={post} />
          </>
        )}
      </Main>
    </Suspense>
  );
}
