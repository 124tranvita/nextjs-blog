// app/page.tsx
import { Suspense } from "react";
import { getPosts } from "@/actions";
import Main from "@/app/common/ui/main";

import { LIMIT, PAGE_INIT } from "@/app/common/lib/constants";
import { Loader } from "./loader";
import Home from "@/app/common/ui/home";

// https://github.com/vercel/next.js/issues/44062
export const dynamic = "force-dynamic";

export default async function Page() {
  const initialPosts = await getPosts(PAGE_INIT, LIMIT);

  return (
    <Suspense fallback={null}>
      <Main mainPage={true}>
        <Home initialPosts={initialPosts} />
      </Main>
    </Suspense>
  );
}
