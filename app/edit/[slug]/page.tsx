// app/edit/[slug]/page.tsx

import { Suspense } from "react";
import { Metadata } from "next";
import { getPost } from "@/actions";
import { Loader } from "@/app/loader";
import { ResponseStat } from "@/app/common/lib/constants";
import EditPost from "@/app/common/ui/edit";

export const dynamic = "force-dynamic";

type Props = {
  params: { slug: string };
};

// set dynamic metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const res = await getPost(params.slug);
  const post = JSON.parse(res);

  if (post.message === ResponseStat.Error) {
    throw new Error(post.error);
  }

  return {
    title: `Edit - ${post.data.title}`,
    description: post.data.title,
  };
}

export default async function Page({ params }: { params: { slug: string } }) {
  const res = await getPost(params.slug);
  const post = JSON.parse(res);

  if (post.message === ResponseStat.Error) {
    throw new Error(post.error);
  }

  return (
    <Suspense fallback={<Loader />}>
      {post && (
        <>
          <EditPost post={post.data} />
        </>
      )}
    </Suspense>
  );
}
