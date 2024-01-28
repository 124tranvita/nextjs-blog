import { getPost } from "@/app/actions";
import EditPost from "./components/edit-post";

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
