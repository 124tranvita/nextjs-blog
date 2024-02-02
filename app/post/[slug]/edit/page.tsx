// app/posts/[slug]/editpage.tsx
import { getPost } from "@/app/actions";
import { Metadata } from "next";
import EditPost from "./components/edit-post";

type Props = {
  params: { slug: string };
};

// set dynamic metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost(params.slug);

  return {
    title: `Edit - ${post.title}`,
    description: post.title,
  };
}

export default async function Page({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);

  return (
    <main className="max-w-screen-lg min-h-screen p-6 mx-auto overflow-hidden">
      {post && (
        <>
          <EditPost post={post} />
        </>
      )}
    </main>
  );
}
