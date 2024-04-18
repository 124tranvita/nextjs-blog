// app/edit/[slug]/page.tsx

import { Suspense } from "react";
import { Metadata } from "next";
import { getPost } from "@/actions";
import { Loader } from "@/app/loader";
import EditPost from "@/common/ui/edit";

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
    <Suspense fallback={<Loader />}>
      {post && (
        <>
          <EditPost post={post} />
        </>
      )}
    </Suspense>
  );
}
