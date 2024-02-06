"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { SearchIcon } from "@/app/ui/icons";
import { BasicInput } from "@/app/ui/inputs";

export default function SearchBar() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = useCallback(() => {
    router.push(`/search?q=${searchTerm}`);
  }, [router, searchTerm]);

  return (
    <div className="relative">
      <BasicInput
        type="text"
        name="search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="pe-10"
        placeholder="Search..."
      />
      <div
        className="absolute inset-y-0 end-0 flex items-center pe-4 hover:cursor-pointer"
        onClick={handleSearch}
      >
        <SearchIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
      </div>
    </div>
  );
}
