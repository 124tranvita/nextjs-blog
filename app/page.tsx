import { getPosts } from "@/app/actions";
import HomePost from "./components/home-post";
import { PencilIcon } from "@heroicons/react/20/solid";
import { FloatIconWithTooltip } from "@/app/ui/button";
import { Main } from "@/components/common";

export default async function Page() {
  const posts = await getPosts();

  return (
    <Main>
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
    </Main>
  );
}
