// app/[lang]/components/home-post.tsx
// https://medium.com/@ferlat.simon/infinite-scroll-with-nextjs-server-actions-a-simple-guide-76a894824cfd
"use client";

import { FC, useEffect, useState, useCallback, useRef, Suspense } from "react";
import { Post } from "@/common/lib/model";
import { LIMIT, PAGE_INIT } from "@/common/lib/constants";

import { MorePostLoading, PostViewLoader } from "@/app/loader";
import { getPosts } from "@/actions";
import PostView from "@/common/components/post-view";

type Props = {
  initialPosts: Post[];
};

const Home: FC<Props> = ({ initialPosts }) => {
  const [isLoading, setIsLoading] = useState(false);

  const [page, setPage] = useState<number>(PAGE_INIT + 1);
  const [posts, setPost] = useState<Post[]>(initialPosts);

  const ref = useRef<HTMLDivElement | null>(null);

  /** Call `getPosts` api */
  const loadMorePosts = useCallback(async () => {
    setIsLoading(true);
    const apiPosts = await getPosts(page, LIMIT);

    if (apiPosts && apiPosts.length > 0) {
      setIsLoading(false);
      setPost([...posts, ...apiPosts]);
      setPage((prevPage) => prevPage + PAGE_INIT);
      return;
    }
    setIsLoading(false);
    return;
  }, [page, posts]);

  /** Infinity scroll by intersection observer api */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          loadMorePosts();
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
  }, [loadMorePosts]);

  return (
    <>
      {posts.length > 0 ? (
        posts.map((post: Post) => (
          <div key={post._id} ref={ref}>
            <Suspense fallback={<PostViewLoader />}>
              <PostView post={post} isSummary={true} />
            </Suspense>
          </div>
        ))
      ) : (
        <></>
      )}
      {isLoading && <MorePostLoading />}
    </>
  );
};

export default Home;
