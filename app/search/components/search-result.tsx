// app/[lang]/search/components/search-result.tsx
"use client";

import { useEffect, useState } from "react";
import { getSearchPosts } from "@/actions";
import HomePost from "@/app/home-post";
import { Post } from "@/common/lib/model";
import { useSearchParams } from "next/navigation";
import { Article } from "@/components/common";
import { ContentLoading } from "../../loader";

export default function SearchResult() {
  const searchParams = useSearchParams();
  const search = searchParams.get("q");
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);

  /** Fetch post data base on search params */
  useEffect(() => {
    async function fetchData(search: string) {
      const response = await getSearchPosts(search);
      setPosts(response);
      setIsLoading(false);
    }
    if (search) {
      setIsLoading(true);
      fetchData(search);
    }
  }, [search]);

  return (
    <Article>
      <div className="mb-3">
        <p className="text-2xl font-semibold text-slate-800 dark:text-slate-50">
          Search result for{" "}
          <mark className="mx-2 px-2 text-white bg-blue-600 rounded dark:bg-blue-500">
            {search}
          </mark>
        </p>
      </div>
      {isLoading ? (
        <ContentLoading />
      ) : (
        <>
          <span className="text-mb italic text-gray-400">{`Total: ${posts.length}`}</span>
          {posts && posts.length > 0 ? (
            posts.map((post: Post) => <HomePost post={post} key={post._id} />)
          ) : (
            <div className="text-slate-800 dark:text-slate-50">No result</div>
          )}
        </>
      )}
    </Article>
  );
}
