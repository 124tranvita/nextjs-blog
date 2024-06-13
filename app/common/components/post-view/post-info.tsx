// @/common/components/post-view/post-info.tsx

import { FC } from "react";
import { UserIcon, CalendarIcon, PencilIcon } from "@heroicons/react/24/solid";
import { formatDate } from "@/app/common/lib/utils";
import { IconWithTextWrapper, IconWithText } from "../common/container";
import { Author } from "../../lib/model";

type PostInfoProps = {
  author: string;
  createdAt: string | Date;
  updatedAt: string | Date;
};

export const PostInfo: FC<PostInfoProps> = ({
  author,
  createdAt,
  updatedAt,
}) => (
  <div className="w-[768px] mx-auto">
    <IconWithTextWrapper>
      {/* Author info */}
      <IconWithText
        icon={
          <UserIcon
            className="mr-1.5 h-5 w-5 flex-shrink-0"
            aria-hidden="true"
          />
        }
        value={author}
      />
      {/* Created at info */}
      {!updatedAt && (
        <IconWithText
          icon={
            <CalendarIcon
              className="mr-1.5 h-5 w-5 flex-shrink-0"
              aria-hidden="true"
            />
          }
          value={formatDate(createdAt)}
        />
      )}
      {/* Updated at info */}
      {updatedAt && (
        <IconWithText
          icon={
            <PencilIcon
              className="mr-1.5 h-5 w-5 flex-shrink-0"
              aria-hidden="true"
            />
          }
          value={formatDate(updatedAt)}
        />
      )}
    </IconWithTextWrapper>
  </div>
);
