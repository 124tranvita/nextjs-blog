"use client";

import { useCallback } from "react";
import {
  ArrowUturnRightIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/20/solid";
import { deletePost } from "@/actions";
import useDictionary from "../hooks/useDictionary";
import useScreenPath from "../hooks/useScreenPath";
import useCookies from "../hooks/useCookies";
import useLoader from "../hooks/useLoader";
import { Options } from "../lib/constants";
import { FloatIconWithTooltip } from "./common/button";

type Props = {
  postId?: string;
  belongUsr?: boolean;
  localImg?: string;
  mainPage?: boolean;
};

export default function SideControl({
  postId,
  belongUsr = false,
  localImg,
  mainPage = false,
}: Props) {
  const { d } = useDictionary();
  const { getCookie } = useCookies();
  const { showLoader } = useLoader();

  const isSignedIn = getCookie("isSignedIn");

  const handleDelete = useCallback(() => {
    if (postId && confirm("Are you sure?") === true) {
      showLoader(d("loader.processing"));
      deletePost(postId, localImg ? localImg : "");
    }
    return;
  }, [postId, showLoader, d, localImg]);

  if (!isSignedIn || isSignedIn === Options.No) {
    return (
      <>
        {!mainPage && (
          <div className="fixed right-2 md:right-24 bottom-0 md:bottom-2 flex flex-col">
            <FloatIconWithTooltip
              icon={
                <>
                  <ArrowUturnRightIcon
                    className="m-auto h-5 w-5 flex-shrink-0 text-white"
                    aria-hidden="true"
                  />
                </>
              }
              tooltip={d("tooltips.back")}
              pathname="/"
              variant="primary"
              replace={true}
            />
          </div>
        )}
      </>
    );
  }

  return (
      <div className="fixed right-2 md:right-24 bottom-0 md:bottom-2 flex flex-col">
        {postId && belongUsr ? (
          <>
            <FloatIconWithTooltip
              icon={
                <>
                  <PencilIcon
                    className="m-auto h-5 w-5 flex-shrink-0 text-white"
                    aria-hidden="true"
                  />
                </>
              }
              tooltip={d("tooltips.edit")}
              variant="primary"
              pathname={`/edit/${postId}`}
            />
            <FloatIconWithTooltip
              icon={
                <>
                  <TrashIcon
                    className="m-auto h-5 w-5 flex-shrink-0 text-white"
                    aria-hidden="true"
                  />
                </>
              }
              tooltip={d("tooltips.delete")}
              onClick={handleDelete}
              variant="danger"
              pathname=""
            />
          </>
        ) : (
          <></>
        )}
        {mainPage && isSignedIn === Options.Yes ? (
          <>
            <FloatIconWithTooltip
              icon={
                <>
                  <PencilIcon
                    className="m-auto h-5 w-5 flex-shrink-0 text-white"
                    aria-hidden="true"
                  />
                </>
              }
              tooltip={d("tooltips.create")}
              variant="primary"
              pathname="/new"
            />
          </>
        ) : (
          <></>
        )}
        {!mainPage && (
          <div className="">
            <FloatIconWithTooltip
              icon={
                <>
                  <ArrowUturnRightIcon
                    className="m-auto h-5 w-5 flex-shrink-0 text-white"
                    aria-hidden="true"
                  />
                </>
              }
              tooltip={d("tooltips.back")}
              variant="primary"
              pathname="/"
              replace={true}
            />
          </div>
        )}
      </div>
  );
}
