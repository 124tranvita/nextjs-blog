// app/loader.tsx

import { Article } from "@/common/components/common/container";
import ContentLoaderSkeleton from "@/common/components/common/loader/content-loader-skeleton";
import HeaderLoaderSkeleton from "@/common/components/common/loader/header-loader-skeleton";
import LoaderSkeleton from "@/common/components/common/loader/loader-skeleton";
import MorePostLoaderSkeleton from "@/common/components/common/loader/more-post-loader-skeleton";

export function PostViewLoader() {
  return (
    <Article>
      <HeaderLoaderSkeleton />
      <ContentLoaderSkeleton />
    </Article>
  );
}

export function Loader() {
  return (
    <>
      <LoaderSkeleton />
    </>
  );
}

export function MorePostLoader() {
  return (
    <>
      <MorePostLoaderSkeleton />
    </>
  );
}
