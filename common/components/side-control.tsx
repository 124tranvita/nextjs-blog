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
  id?: string;
  coverImgFileId?: string;
  mainPage?: boolean;
};

export default function SideControl({
  id,
  coverImgFileId,
  mainPage = false,
}: Props) {
  const { d } = useDictionary();
  const { getCookie } = useCookies();
  const { showLoader } = useLoader();

  const isSignedIn = getCookie("isSignedIn");

  const handleDelete = useCallback(() => {
    if (id && confirm("Are you sure?") === true) {
      showLoader(d("loader.processing"));
      deletePost(id, coverImgFileId ? coverImgFileId : "");
    }
    return;
  }, [id, showLoader, d, coverImgFileId]);

  if (!isSignedIn || isSignedIn === Options.No) {
    return (
      <>
        {!mainPage && (
          <div className="fixed right-2 bottom-0 md:right-16 flex flex-col">
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
    <>
      {id ? (
        <>
          <div className="fixed right-2 bottom-16 md:right-16 md:bottom-32 flex flex-col">
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
              pathname={`/edit/${id}`}
            />
          </div>
          <div className="fixed right-2 bottom-0 md:right-16 md:bottom-16 flex flex-col">
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
          </div>
        </>
      ) : (
        <>
          <div className="fixed right-2 bottom-4 md:right-16 md:bottom-20 flex flex-col">
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
          </div>
        </>
      )}
      {!mainPage && (
        <div className="fixed right-2 bottom-0 md:right-16 flex flex-col">
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
    </>
  );
}
