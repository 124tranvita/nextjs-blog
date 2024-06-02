// app/post/[slug]/page.tsx

import { Suspense } from "react";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { getPost } from "@/actions";
import { decrypt } from "@/app/common/lib/crypto";
import PostDetail from "@/app/common/ui/post";
import Main from "@/app/common/ui/main";

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

  // Get session data
  const encryptedSessionData = cookies().get("session")?.value;
  const sessionData: any = encryptedSessionData
    ? JSON.parse(decrypt(encryptedSessionData))
    : null;

  return (
    <Suspense fallback={null}>
      {post && (
        <Main
          postId={post._id}
          localImg={post.localImg}
          belongUsr={
            sessionData && sessionData.user._id === post.user ? true : false
          }
        >
          <PostDetail post={post} />
        </Main>
      )}
    </Suspense>
  );
}
