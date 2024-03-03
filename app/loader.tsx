import ContentLoadingSkeleton from "@/components/loading-skeleton/content-loading-skeleton";
import HeaderLoadingSkeleton from "@/components/loading-skeleton/header-loading-skeleton";

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
