import { getPost } from "@/app/actions";
import PostDetail from "./components/post-detail";

export default async function Page({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);

  return (
    <main className="max-w-screen-lg min-h-screen p-6 mx-auto overflow-hidden">
      {post && <PostDetail post={post} />}
    </main>
  );
}
