import { Suspense } from "react";
import { getPosts } from "@/app/actions";
import HomePost from "./components/home-post";
import { PencilIcon } from "@heroicons/react/24/outline";
import { FloatIconWithTooltip } from "@/app/ui/button";
import { Main } from "@/components/common";

export default async function Page() {
  const posts = await getPosts();

  return (
    <Main>
      <Suspense fallback={<p>Loading feed...</p>}>
        {posts.length > 0 ? (
          posts
            .sort(
              (a, b) =>
                Date.parse(b.createdAt as string) -
                Date.parse(a.createdAt as string)
            )
            .sort(
              (a, b) =>
                Date.parse(b.updatedAt as string) -
                Date.parse(a.updatedAt as string)
            )
            .map((post, index) => <HomePost key={index} post={post} />)
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
      </Suspense>
    </Main>
  );
}
