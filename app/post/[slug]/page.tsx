// app/[lang]/post/[slug]/page.tsx
import { Suspense } from "react";
import { cookies } from "next/headers";
import { Metadata } from "next";
import { getPost } from "@/app/actions";
import { Main } from "@/components/common";
import SideControl from "@/components/side-control";
import { decrypt } from "@/app/lib/crypto";
import { NextPageLoading } from "../../loader";
import PostDetail from "./components/post-detail";

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
  const encryptedSessionData = cookies().get("session")?.value;
  const sessionData = encryptedSessionData
    ? JSON.parse(decrypt(encryptedSessionData))
    : null;
  const post = await getPost(params.slug);

  return (
    <Suspense fallback={<NextPageLoading />}>
      <Main>
        {post && (
          <>
            <PostDetail post={post} />
            {sessionData && sessionData.user && (
              <SideControl id={post._id} coverImgFileId={post.coverImgFileId} />
            )}
          </>
        )}
      </Main>
    </Suspense>
  );
}
