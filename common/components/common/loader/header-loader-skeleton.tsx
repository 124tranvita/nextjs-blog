import { CalendarIcon, PencilIcon, UserIcon } from "@heroicons/react/20/solid";

export default function HeaderLoaderSkeleton() {
  return (
    <div className="mb-8">
      <div
        role="status"
        className="w-full flex items-center justify-center h-[312px] md:h-[412px] lg:h-[512px] mb-8 bg-gray-300 rounded-lg animate-pulse dark:bg-gray-700"
      >
        <svg
          className="w-10 h-10 text-gray-200 dark:text-gray-600"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 16 20"
        >
          <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
          <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM9 13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2Zm4 .382a1 1 0 0 1-1.447.894L10 13v-2l1.553-1.276a1 1 0 0 1 1.447.894v2.764Z" />
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
      <div className="h-10 bg-gray-200 rounded-full dark:bg-gray-700 max-w-md mb-4"></div>
      <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
        <div className="mt-2 flex items-center text-sm text-gray-500">
          <UserIcon
            className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
            aria-hidden="true"
          />
          <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-32"></div>
        </div>

        <div className="mt-2 flex items-center text-sm text-gray-500">
          <CalendarIcon
            className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
            aria-hidden="true"
          />
          <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-32"></div>
        </div>
        <div className="mt-2 flex items-center text-sm text-gray-500">
          <PencilIcon
            className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
            aria-hidden="true"
          />
          <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-32"></div>
        </div>
      </div>
    </div>
  );
}
