import Image from "next/image";
import Link from "next/link";
import { Post } from "../lib/model";
import PostContent from "../lib/components/post-content";
import { formatDate, truncateText } from "../lib/utils";
import { CalendarIcon, PencilIcon, UserIcon } from "@heroicons/react/20/solid";

type Props = {
  post: Post;
};

export default function PostCard({ post }: Props) {
  const { _id, author, cover, title, content, createdAt, updatedAt } = post;
  return (
    <div className="relative mb-6 bg-white border border-gray-200 rounded-lg shadow hover:shadow-xl duration-300 dark:bg-gray-800 dark:border-gray-700">
      <Link href={`/post/${_id}`}>
        <Image
          src={cover}
          alt={`${title}_image`}
          width={0}
          height={0}
          sizes="100vw"
          style={{
            objectFit: "cover",
            height: "100%",
            width: "100%",
            inset: "0px",
            position: "relative",
            borderTopLeftRadius: "0.5rem",
            borderTopRightRadius: "0.5rem",
          }}
        />
      </Link>
      <div className="p-5">
        <Link href={`/post/${_id}`}>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {title}
          </h5>
        </Link>
        <div className="mt-2 mb-3 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
          <div className="mt-2 flex items-center text-sm text-gray-500">
            <UserIcon
              className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
              aria-hidden="true"
            />
            {author}
          </div>

          <div className="mt-2 flex items-center text-sm text-gray-500">
            <CalendarIcon
              className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
              aria-hidden="true"
            />
            {formatDate(createdAt)}
          </div>
          {updatedAt && (
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <PencilIcon
                className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                aria-hidden="true"
              />
              {formatDate(updatedAt)}
            </div>
          )}
        </div>
        <PostContent content={truncateText(content, 250)} />
        <Link
          href={`/post/${_id}`}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Read more
          <svg
            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}
