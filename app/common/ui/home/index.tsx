// @common/ui/home/index.tsx
// https://medium.com/@ferlat.simon/infinite-scroll-with-nextjs-server-actions-a-simple-guide-76a894824cfd
"use client";

import { FC, useEffect, useState, useCallback, useRef, Suspense } from "react";
import { Post } from "@/app/common/lib/model";
import { getPosts } from "@/actions";
import { MorePostLoader, PostViewLoader } from "@/app/loader";
import { LIMIT, PAGE_INIT } from "@/app/common/lib/constants";
import Typography from "@/app/common/components/common/typography";
import useDictionary from "@/app/common/hooks/useDictionary";
import PostDetailView from "@/app/common/components/post-view";
import { Link } from "@/app/common/components/custom-link";

type Props = {
  initialPosts: Post[];
};

const Home: FC<Props> = ({ initialPosts }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState<number>(PAGE_INIT + 1);
  const [posts, setPosts] = useState<Post[]>(initialPosts);

  const { d } = useDictionary();

  const ref = useRef<HTMLDivElement | null>(null);

  /** Call `getPosts` api */
  const loadMorePosts = useCallback(async () => {
    setIsLoading(true);
    const apiPosts = await getPosts(page, LIMIT);

    if (apiPosts && apiPosts.length > 0) {
      setIsLoading(false);
      setPosts([...posts, ...apiPosts]);
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
    <Suspense fallback={<PostViewLoader />}>
      {posts.length > 0 ? (
        posts.map((post: Post) => (
          <div key={post._id} ref={ref}>
            <PostDetailView post={post} view="home" articleSize="medium" />
            <Link href={`/post/${post._id}`}>
              <Typography type="muted" text={d("readMore")} />
            </Link>
          </div>
        ))
      ) : (
        <>
          <PostViewLoader />
        </>
      )}
      {isLoading && <MorePostLoader />}
    </Suspense>
  );
};

export default Home;
