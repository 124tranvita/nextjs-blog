// app/loader.tsx

import { Article } from "@/app/common/components/common/container";
import ContentLoaderSkeleton from "@/app/common/components/common/loader/content-loader-skeleton";
import HeaderLoaderSkeleton from "@/app/common/components/common/loader/header-loader-skeleton";
import LoaderSkeleton from "@/app/common/components/common/loader/loader-skeleton";
import MorePostLoaderSkeleton from "@/app/common/components/common/loader/more-post-loader-skeleton";

export function PostViewLoader() {
  return (
    <Article width="medium">
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
