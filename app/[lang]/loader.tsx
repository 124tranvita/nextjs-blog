// app/[lang]/loader.tsx
import ContentLoadingSkeleton from "@/components/loading-skeleton/content-loading-skeleton";
import HeaderLoadingSkeleton from "@/components/loading-skeleton/header-loading-skeleton";
import MorePostLoadingSkeleton from "@/components/loading-skeleton/more-post-loading-skeleton";
import MovePageLoadingSkeleton from "@/components/loading-skeleton/move-page-loading-skeleton";

export function HeaderLoading() {
  return (
    <>
      <HeaderLoadingSkeleton />
    </>
  );
}

export function ContentLoading() {
  return (
    <>
      <ContentLoadingSkeleton />
    </>
  );
}

export function NextPageLoading() {
  return (
    <>
      <MovePageLoadingSkeleton />
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
