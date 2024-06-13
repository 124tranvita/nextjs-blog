// app/page.tsx
import { Suspense } from "react";
import { getPosts } from "@/actions";
import Main from "@/app/common/ui/main";
import Home from "@/app/common/ui/home";
import { LIMIT, PAGE_INIT } from "@/app/common/lib/constants";
import { PostViewLoader } from "./loader";
import { Post } from "./common/lib/model";

// https://github.com/vercel/next.js/issues/44062
export const dynamic = "force-dynamic";

export default async function Page() {
  const res = await getPosts(PAGE_INIT, LIMIT);
  const posts = JSON.parse(res);

  return (
    <Main mainPage={true}>
      <Suspense fallback={<PostViewLoader />}>
        <Home initialPosts={posts.data as Post[]} />
      </Suspense>
    </Main>
  );
}
