// app/page.tsx
import { Suspense } from "react";
import { getPosts } from "@/actions";
import Main from "@/common/ui/main";

import { LIMIT, PAGE_INIT } from "@/common/lib/constants";
import { Loader } from "./loader";
import Home from "@/common/ui/home";

export default async function Page() {
  const initialPosts = await getPosts(PAGE_INIT, LIMIT);

  return (
    <Suspense fallback={<Loader />}>
      <Main mainPage={true}>
        <Home initialPosts={initialPosts} />
      </Main>
    </Suspense>
  );
}
