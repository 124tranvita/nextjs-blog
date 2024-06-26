// @/common/ui/search/indexe.tsx
"use client";

import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getSearchPosts } from "@/actions";
import { MorePostLoader, PostViewLoader } from "@/app/loader";
import { LIMIT, PAGE_INIT } from "@/app/common/lib/constants";
import { Post } from "@/app/common/lib/model";
import { Article } from "@/app/common/components/common/container";
import useDictionary from "@/app/common/hooks/useDictionary";
import useLoader from "@/app/common/hooks/useLoader";
import PostDetailView from "@/app/common/components/post-view";

export default function SearchResult() {
  const searchParams = useSearchParams();
  const search = searchParams.get("q");
  const { d } = useDictionary();
  const { hideLoader } = useLoader();

  const flagRef = useRef<boolean>(false);

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMorePost, setIsLoadingMorePost] = useState(false);
  const [page, setPage] = useState<number>(PAGE_INIT + 1);
  const [posts, setPosts] = useState<Post[]>([]);

  const ref = useRef<HTMLDivElement | null>(null);

  /** Call `getSearchPosts` api */
  const loadMorePosts = useCallback(
    async (search: string) => {
      setIsLoadingMorePost(true);
      const res = await getSearchPosts(search, page, LIMIT);
      const apiPosts = JSON.parse(res);

      if (apiPosts.data && apiPosts.data.length > 0) {
        setIsLoadingMorePost(false);
        setPosts([...posts, ...apiPosts.data]);
        setPage((prevPage) => prevPage + PAGE_INIT);
        return;
      }
      setIsLoadingMorePost(false);
      return;
    },
    [page, posts]
  );

  /** Infinity scroll by intersection observer api */
  useEffect(() => {
    // Turn off loader
    hideLoader();
    // Make sure this useEffect NOT call `getSearchPosts` for the first time (initial time)
    if (!search || !flagRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          loadMorePosts(search);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 1, rootMargin: "250px" }
    );

    const element = ref.current;
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [hideLoader, loadMorePosts, search]);

  /** Fetch searched data base on search params */
  useEffect(() => {
    async function fetchData(search: string) {
      const res = await getSearchPosts(search, PAGE_INIT, LIMIT);
      const posts = JSON.parse(res);
      setPosts(posts.data);
      setIsLoading(false);
      flagRef.current = true;
    }
    if (search) {
      setIsLoading(true);
      fetchData(search);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  return (
    <>
      <Article width="medium">
        <div className="mb-3">
          <p className="text-2xl font-semibold text-slate-800 dark:text-slate-50">
            {d("search.placeholder")}{" "}
            <mark className="mx-2 px-2 text-white bg-blue-600 rounded dark:bg-blue-500">
              {search}
            </mark>
          </p>
        </div>
        {isLoading ? (
          <PostViewLoader />
        ) : (
          <>
            <span className="text-mb italic text-gray-400">{`${d(
              "search.result"
            )}: ${posts.length || 0}`}</span>
            {posts && posts.length > 0 ? (
              posts.map((post: Post) => (
                <div key={post._id} ref={ref}>
                  <Suspense fallback={<PostViewLoader />}>
                    <PostDetailView
                      post={post}
                      view="home"
                      articleSize="medium"
                    />
                  </Suspense>
                </div>
              ))
            ) : (
              <div className="text-slate-800 dark:text-slate-50">
                {d("search.noresult")}
              </div>
            )}
          </>
        )}
      </Article>
      {isLoadingMorePost && <MorePostLoader />}
    </>
  );
}
