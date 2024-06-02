"use client";

import { EllipsisHorizontalIcon } from "@heroicons/react/20/solid";
import {
  HeartIcon as HeartIconOutline,
  BookmarkIcon as BookmarkIconOutline,
  ChatBubbleBottomCenterIcon as ChatBubbleBottomCenterIconOutline,
} from "@heroicons/react/24/outline";
import {
  HeartIcon as HeartIconSolid,
  BookmarkIcon as BookmarkIconSolid,
  ChatBubbleBottomCenterIcon as ChatBubbleBottomCenterIconSolid,
} from "@heroicons/react/24/solid";
import { useCallback, useState } from "react";

export default function PostReact({ ...props }) {
  const [liked, setLiked] = useState(false);
  const [commented, setCommented] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  const onClickLike = useCallback(() => {
    setLiked(!liked);
  }, [liked]);

  const onClickComment = useCallback(() => {
    setCommented(!commented);
  }, [commented]);

  const onClickBookmark = useCallback(() => {
    setBookmarked(!bookmarked);
  }, [bookmarked]);

  return (
    <div {...props}>
      <div className="w-9 mx-4 flex items-center">
        {liked ? (
          <>
            <HeartIconSolid
              onClick={onClickLike}
              className="cursor-pointer text-red-500 "
            />
          </>
        ) : (
          <>
            <HeartIconOutline
              onClick={onClickLike}
              className="hover:text-gray-700 cursor-pointer"
            />
          </>
        )}
        <span className="ml-1">0</span>
      </div>
      <div className="w-9 mx-4 flex items-center">
        {commented ? (
          <>
            <ChatBubbleBottomCenterIconSolid
              onClick={onClickComment}
              className="cursor-pointer text-gray-50 "
            />
          </>
        ) : (
          <>
            <ChatBubbleBottomCenterIconOutline
              onClick={onClickComment}
              className="hover:text-gray-700 cursor-pointer"
            />
          </>
        )}
        <span className="ml-1">0</span>
      </div>
      <div className="w-6 flex mx-4 items-center">
        {bookmarked ? (
          <>
            <BookmarkIconSolid
              onClick={onClickBookmark}
              className="text-gray-50 cursor-pointer"
            />
          </>
        ) : (
          <>
            <BookmarkIconOutline
              onClick={onClickBookmark}
              className="hover:text-gray-700 cursor-pointer"
            />
          </>
        )}
        <span></span>
      </div>
      <EllipsisHorizontalIcon className="hover:text-gray-50 cursor-pointer w-6" />
    </div>
  );
}
