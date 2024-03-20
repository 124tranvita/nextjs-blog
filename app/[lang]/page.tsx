// app/[lang]/page.tsx
import { Suspense } from "react";
import { cookies } from "next/headers";
import { Main } from "@/components/common";
import SideControl from "@/components/side-control";
import { getPosts } from "@/app/actions";
import { decrypt } from "../lib/crypto";
import HomePost from "./components/home-post";
import { NextPageLoading } from "./loader";

export default async function Page() {
  const encryptedSessionData = cookies().get("session")?.value;
  const sessionData = encryptedSessionData
    ? JSON.parse(decrypt(encryptedSessionData))
    : null;

  const posts = await getPosts();

  return (
    <Suspense fallback={<NextPageLoading />}>
      <Main>
        {posts.length > 0 ? (
          posts
            .sort(
              (a, b) =>
                Date.parse(b.createdAt as string) -
                Date.parse(a.createdAt as string)
            )
            .sort(
              (a, b) =>
                Date.parse(b.updatedAt as string) -
                Date.parse(a.updatedAt as string)
            )
            .map((post, index) => <HomePost key={index} post={post} />)
        ) : (
          <></>
        )}
        {sessionData && sessionData.user && <SideControl />}
      </Main>
    </Suspense>
  );
}
