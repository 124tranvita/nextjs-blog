import { getPosts } from "@/app/actions";
import HomePost from "./components/home-post";
import Link from "next/link";
import { PencilIcon } from "@heroicons/react/20/solid";

export default async function Page() {
  const posts = await getPosts();

  return (
    <main className="max-w-screen-md min-h-screen p-6 mx-auto overflow-hidden">
      {posts.length > 0 ? (
        posts.map((post, index) => <HomePost key={index} post={post} />)
      ) : (
        <></>
      )}
      <div className="fixed right-10 bottom-12 md:right-16 md:bottom-20 flex flex-col">
        <Link href={`/new`}>
          <button className="bg-blue-500 hover:bg-blue-700 text-white h-12 w-12 rounded-full shadow-lg mb-3">
            <PencilIcon
              className="m-auto h-5 w-5 flex-shrink-0 text-white"
              aria-hidden="true"
            />
          </button>
        </Link>
      </div>
    </main>
  );
}
