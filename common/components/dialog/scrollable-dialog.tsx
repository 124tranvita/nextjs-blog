"use client";

import { Fragment, ReactNode, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import useDictionary from "../../hooks/useDictionary";
import { Button } from "../common/button";

type Props = {
  btnLabel: string;
  title: string;
  children: ReactNode;
  disabled?: boolean;
};

export default function ScrollableDialog({
  btnLabel,
  title,
  children,
  disabled = false,
}: Props) {
  const { d } = useDictionary();
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <div className="flex items-center justify-center">
        <Button
          type="button"
          onClick={openModal}
          label={btnLabel}
          variant="primary"
          fullWidth
          disabled={disabled}
        />
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          </Transition.Child>

          <div className="fixed inset-0 w-screen overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="fixed w-full max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg transform overflow-hidden rounded-xl bg-white dark:bg-slate-800 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="div"
                    className="absolute top-0 left-0 z-[9999] h-[52px] bg-white dark:bg-slate-900 w-full p-4 shadow-md text-lg font-bold leading-6 text-gray-900 dark:text-gray-50"
                  >
                    {title}
                  </Dialog.Title>
                  <div className="mt-[50px] pl-4 pr-2 py-2 overflow-y-scroll max-h-[75vh] md:max-h-[80vh]">
                    {children}
                  </div>

                  <div className="text-end p-4">
                    <Button
                      type="button"
                      variant="danger"
                      onClick={closeModal}
                      label={d("close")}
                    />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
