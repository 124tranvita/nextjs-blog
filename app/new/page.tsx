// app/[lang]/new/page.tsx
import { Suspense } from "react";
import { Metadata } from "next";
import NewPost from "./components/new-post";
import { Main } from "@/components/common";
import { NextPageLoading } from "../loader";

// Static metadata
export const metadata: Metadata = {
  title: "New post",
  description: "Create new post",
};

export default function Page() {
  return (
    <Suspense fallback={<NextPageLoading />}>
      <Main>
        <NewPost />
      </Main>
    </Suspense>
  );
}
