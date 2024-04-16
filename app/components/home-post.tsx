// app/[lang]/components/home-post.tsx
// https://medium.com/@ferlat.simon/infinite-scroll-with-nextjs-server-actions-a-simple-guide-76a894824cfd
"use client";

import { FC, useEffect, useState, useCallback, useRef, RefObject } from "react";
import dynamic from "next/dynamic";
import { Article } from "@/components/common";
import { Post } from "@/app/lib/model";
import { LIMIT, PAGE_INIT } from "@/app/lib/constants";

import { ContentLoading, HeaderLoading, MorePostLoading } from "@/app/loader";
import { getPosts } from "@/app/actions";

const PostHeader = dynamic(() => import("@/components/post/post-header"), {
  loading: () => <HeaderLoading />,
  ssr: false,
});

const PostSummary = dynamic(() => import("@/components/post/post-summary"), {
  loading: () => <ContentLoading />,
  ssr: false,
});

type Props = {
  initialPosts: Post[];
};

const HomePost: FC<Props> = ({ initialPosts }) => {
  const [isMoveNext, setIsMoveNext] = useState(false);
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
        posts.map((post) => (
          <Article key={post._id} isMoveNext={isMoveNext} ref={ref}>
            <PostHeader
              _id={post._id}
              title={post.title}
              coverImgFileId={post.coverImgFileId}
              createdAt={post.createdAt}
              updatedAt={post.updatedAt}
              author={post.author || "Anonymous"}
              onClick={() => setIsMoveNext(true)}
            />
            <PostSummary
              id={post._id}
              content={post.content}
              onClick={() => setIsMoveNext(true)}
            />
          </Article>
        ))
      ) : (
        <></>
      )}
      {isLoading && <MorePostLoading />}
    </>
  );
};

export default HomePost;
