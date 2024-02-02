import { getPosts } from "@/app/actions";
import HomePost from "./components/home-post";
import { PencilIcon } from "@heroicons/react/20/solid";
import { FloatIconWithTooltip } from "./lib/components/button";

export default async function Page() {
  const posts = await getPosts();

  return (
    <main className="max-w-screen-md min-h-screen p-6 mx-auto overflow-hidden">
      {posts.length > 0 ? (
        posts.map((post, index) => <HomePost key={index} post={post} />)
      ) : (
        <></>
      )}
      <div className="fixed right-2 bottom-4 md:right-16 md:bottom-20 flex flex-col">
        <FloatIconWithTooltip
          icon={
            <>
              <PencilIcon
                className="m-auto h-5 w-5 flex-shrink-0 text-white"
                aria-hidden="true"
              />
            </>
          }
          path="/new"
          tooltip="New post"
          variant="primary"
        />
      </div>
    </main>
  );
}
