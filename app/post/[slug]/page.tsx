// app/post/[slug]/page.tsx

import { Suspense } from "react";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { getPost } from "@/actions";
import { decrypt } from "@/app/common/lib/crypto";
import { ResponseStat } from "@/app/common/lib/constants";
import PostDetail from "@/app/common/ui/post";
import Main from "@/app/common/ui/main";

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
    title: post.data.title,
    description: post.data.title,
  };
}

export default async function Page({ params }: Props) {
  const res = await getPost(params.slug);
  const post = JSON.parse(res);

  if (post.message === ResponseStat.Error) {
    throw new Error(post.error);
  }

  // Get session data
  const encryptedSessionData = cookies().get("session")?.value;
  const sessionData: any = encryptedSessionData
    ? JSON.parse(decrypt(encryptedSessionData))
    : null;

  return (
    <Suspense fallback={null}>
      {post && (
        <Main
          postId={post.data._id}
          localImg={post.data.localImg}
          belongUsr={
            sessionData && sessionData.user._id === post.data.author._id
              ? true
              : false
          }
        >
          <PostDetail post={post.data} />
        </Main>
      )}
    </Suspense>
  );
}
