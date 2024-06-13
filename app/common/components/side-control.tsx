"use client";

import { useCallback, useState, useEffect } from "react";
import {
  ArrowUturnRightIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/20/solid";
import { deletePost } from "@/actions";
import useDictionary from "../hooks/useDictionary";
import useCookies from "../hooks/useCookies";
import useLoader from "../hooks/useLoader";
import { Options, ResponseStat } from "../lib/constants";
import { FloatIconWithTooltip } from "./common/button";
import { useRouter, redirect } from "next/navigation";
import useToastMsg from "../hooks/useToastMsg";

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
  const router = useRouter();
  const { d } = useDictionary();
  const { getCookie } = useCookies();
  const { showLoader, hideLoader } = useLoader();
  const { showToast } = useToastMsg();

  const [response, setResponse] = useState<any>(null);

  const isSignedIn = getCookie("isSignedIn");

  const handleDelete = useCallback(async () => {
    if (postId && confirm("Are you sure?") === true) {
      // Show `processing` loader
      showLoader(d("loader.processing"));
      const res = await deletePost(postId, localImg ? localImg : "");
      setResponse(JSON.parse(res));
    }
    return;
  }, [postId, showLoader, d, localImg]);

  /** Handle check response from Api */
  useEffect(() => {
    if (response) {
      hideLoader();
      // If api return errors
      if (response.message === ResponseStat.Error) {
        showToast("error", response.error);
        return;
      }

      // Redirect to homepage on success
      showToast("success", d("post.delSuccesss"));
      showLoader(d("loader.processing"));
      router.push(`/`);
      router.refresh();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

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
