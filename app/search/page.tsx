// app/search/page.tsx
import { Suspense } from "react";
import { Metadata } from "next";
import { Loader } from "../loader";
import SearchResult from "@/app/common/ui/search";

type Props = {
  searchParams: any;
};

// set dynamic metadata
export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  return {
    title: `Search fo ${searchParams.q}`,
    description: `Result for ${searchParams.q} `,
  };
}

export default function Page() {
  return (
    <Suspense fallback={<Loader />}>
      <SearchResult />
    </Suspense>
  );
}
