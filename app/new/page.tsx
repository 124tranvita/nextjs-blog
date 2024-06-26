// app/new/page.tsx
import { Suspense } from "react";
import { Metadata } from "next";
import NewPost from "@/app/common/ui/new";
import { Loader } from "../loader";

export const dynamic = "force-dynamic";

// Static metadata
export const metadata: Metadata = {
  title: "New post",
  description: "Create new post",
};

export default function Page() {
  return (
    <Suspense fallback={<Loader />}>
      <NewPost />
    </Suspense>
  );
}
