import { Suspense } from "react";
import SearchResult from "./components/search-result";
import { Metadata } from "next";
import { Main } from "@/components/common";

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

const SearchResultFallback = () => <>your loader</>;

export default function Page() {
  return (
    <Suspense fallback={<SearchResultFallback />}>
      <Main>
        <SearchResult />
      </Main>
    </Suspense>
  );
}
