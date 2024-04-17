// app/[lang]/loader.tsx

import ContentLoadingSkeleton from "@/common/components/loading-skeleton/content-loading-skeleton";
import HeaderLoadingSkeleton from "@/common/components/loading-skeleton/header-loading-skeleton";
import LoaderSkeleton from "@/common/components/loading-skeleton/loader-skeleton";
import MorePostLoadingSkeleton from "@/common/components/loading-skeleton/more-post-loading-skeleton";

export function PostViewLoader() {
  return (
    <>
      <HeaderLoadingSkeleton />
      <ContentLoadingSkeleton />
    </>
  );
}

export function Loader() {
  return (
    <>
      <LoaderSkeleton />
    </>
  );
}

export function MorePostLoading() {
  return (
    <>
      <MorePostLoadingSkeleton />
    </>
  );
}
