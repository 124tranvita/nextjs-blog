import { Suspense } from "react";
import { Main } from "@/app/components/common";
import SearchResult from "./components/search-result";

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
