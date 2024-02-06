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

export default function PostReact() {
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
    <div className="absolute top-0 left-0 px-2 w-12 h-[400px] mt-[56px] py-[2.5rem] bg-gray-900 bg-opacity-70 hover:bg-opacity-100 flex flex-col justify-between text-gray-500 z-10">
      <div className="flex flex-col items-center">
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
        <span>0</span>
      </div>
      <div className="flex flex-col items-center">
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
        <span>0</span>
      </div>
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
      <EllipsisHorizontalIcon className="hover:text-gray-50 cursor-pointer" />
    </div>
  );
}
