// app/posts/[slug]/page.tsx
import { getPost } from "@/app/actions";
import PostDetail from "./components/post-detail";
import { Metadata } from "next";

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

  return (
    <main className="max-w-screen-lg min-h-screen p-6 mx-auto overflow-hidden">
      {post && <PostDetail post={post} />}
    </main>
  );
}
