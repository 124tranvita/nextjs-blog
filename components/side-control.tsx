"use client";

import { useCallback, useState } from "react";
import {
  ArrowUturnRightIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/20/solid";
import { FloatIconWithTooltip } from "@/app/ui/button";
import useDictionary from "@/app/hooks/useDictionary";
import useScreenPath from "@/app/hooks/useScreenPath";
import { deletePost, logout } from "@/app/actions";
import { NextPageLoading } from "@/app/[lang]/loader";

type Props = {
  id?: string;
  coverImgFileId?: string;
};

export default function SideControl({ id, coverImgFileId }: Props) {
  const { d } = useDictionary();
  const { next } = useScreenPath();
  const [isMoveNext, setIsMoveNext] = useState(false);

  const handleCreate = useCallback(() => {
    setIsMoveNext(true);
    next("/new");
  }, [next]);

  const handleEdit = useCallback(() => {
    if (!id) return;

    setIsMoveNext(true);
    next(`/edit/${id}`);
  }, [id, next]);

  const handleDelete = useCallback(() => {
    if (id && confirm("Are you sure?") === true) {
      deletePost(id, coverImgFileId ? coverImgFileId : "");
      next(`/`);
    }
    return;
  }, [id, coverImgFileId, next]);

  const handleLogout = useCallback(async () => {
    setIsMoveNext(true);
    await logout();
  }, []);

  return (
    <>
      {isMoveNext && <NextPageLoading />}
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
              onClick={handleEdit}
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
              onClick={handleCreate}
            />
          </div>
        </>
      )}
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
          tooltip={d("tooltips.logout")}
          onClick={handleLogout}
          variant="danger"
        />
      </div>
    </>
  );
}
