"use client";

import { getSearchPosts } from "@/app/actions";
import HomePost from "@/app/components/home-post";
import PostCard from "@/app/components/post-card";
import { Post } from "@/app/lib/model";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SearchResult() {
  const searchParams = useSearchParams();
  const search = searchParams.get("q");
  const [posts, setPosts] = useState<Post[]>([]);

  console.log({ posts });

  useEffect(() => {
    async function fetchData(search: string) {
      const response = await getSearchPosts(search);
      setPosts(response);
    }
    if (search) {
      fetchData(search);
    }
  }, [search]);

  return (
    <>
      <div className="mb-3">
        <p className="text-2xl font-semibold">
          Search result for{" "}
          <mark className="px-2 text-white bg-blue-600 rounded dark:bg-blue-500">
            {search}
          </mark>
        </p>
        <span className="text-mb italic text-gray-400">{`Total: ${posts.length}`}</span>
      </div>
      {posts && posts.length > 0 ? (
        posts.map((post: Post) => (
          <>
            <HomePost post={post} key={post._id} />
          </>
        ))
      ) : (
        <>No result</>
      )}
    </>
  );
}
