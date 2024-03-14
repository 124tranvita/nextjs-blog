"use client";

import { useCallback, useEffect, KeyboardEvent, useState } from "react";
import { usePathname } from "next/navigation";
import { SearchIcon } from "@/app/ui/icons";
import { BasicInput } from "@/app/ui/inputs";
import useDictionary from "@/app/hooks/useDictionary";
import useScreenPath from "@/app/hooks/useScreenPath";

export default function SearchBar() {
  const pathname = usePathname();
  const { d } = useDictionary();
  const { next } = useScreenPath();
  const [searchTerm, setSearchTerm] = useState("");

  /** Reset input field when transit to other screen */
  useEffect(() => {
    // Regex: string not contain `search` word
    const reg = /^((?!search).)*$/gm;

    // Reset input field if url not a `search` screen.
    if (reg.test(pathname)) {
      setSearchTerm("");
      return;
    }
  }, [pathname]);

  /**
   * Run search query when click on search icon
   * @returns - Move to search result page
   */
  const handleSearch = useCallback(() => {
    if (!searchTerm) return;
    next(`/search?q=${searchTerm}`);
  }, [next, searchTerm]);

  /**
   * Run search query when press enter
   * @param e - HTML element event
   * @returns - Move to search result page
   */
  const handleSearchOnPressEnter = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        if (!searchTerm) return;
        next(`/search?q=${searchTerm}`);
      }
    },
    [next, searchTerm]
  );

  return (
    <div className="relative">
      <BasicInput
        type="text"
        name="search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="pe-10"
        placeholder={d("searchPlaceholder")}
        onKeyUp={(e) => handleSearchOnPressEnter(e)}
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
