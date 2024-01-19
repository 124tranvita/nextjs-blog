"use client";
import { POST } from "@/assets/dev/data";
import { useMemo } from "react";
import PostDetail from "./components/post-detail";

export default function Page({ params }: { params: { slug: string } }) {
  const post = useMemo(() => {
    return POST.find((item) => item.id === params.slug);
  }, [params.slug]);

  return (
    <main className="max-w-screen-lg min-h-screen p-6 mx-auto overflow-hidden">
      {post && <PostDetail post={post} />}
    </main>
  );
}
