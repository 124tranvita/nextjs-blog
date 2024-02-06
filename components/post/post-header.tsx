import Image from "next/image";
import Link from "next/link";
import { CalendarIcon, PencilIcon, UserIcon } from "@heroicons/react/20/solid";
import { Post } from "@/app/lib/model";
import { formatDate } from "@/app/lib/utils";

type Props = Pick<
  Post,
  "_id" | "author" | "cover" | "title" | "createdAt" | "updatedAt"
>;

export default function PostHeader({
  _id,
  author,
  cover,
  title,
  createdAt,
  updatedAt,
}: Props) {
  return (
    <section className="w-full mb-8">
      <Link href={`/post/${_id}`}>
        <div className="relative max-w-full mb-8 rounded-t-md overflow-hidden h-[512px]">
          <Image
            src={cover}
            alt={`${title}_image`}
            fill={true}
            sizes="100vw"
            style={{ objectFit: "cover" }}
          />
        </div>
      </Link>
      <div className="lg:flex lg:items-center lg:justify-between">
        <div className="min-w-0 flex-1">
          <Link href={`/post/${_id}`}>
            <h2 className="text-4xl font-bold mb-3 sm:leading-7 md:leading-9 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight dark:text-gray-100">
              {title}
            </h2>
          </Link>
          <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
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
        </div>
      </div>
    </section>
  );
}