"use client";
import React, { FC } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

type Props = {
  btnLabel: string;
  children: React.ReactNode;
  title?: string;
};

const LongDialog: FC<Props> = ({ btnLabel, children, title }) => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);

  return (
    <>
      <Button className="mt-6" onClick={handleOpen} fullWidth>
        {btnLabel}
      </Button>
      <Dialog open={open} handler={handleOpen} size="lg">
        {title && <DialogHeader>{title}</DialogHeader>}
        <DialogBody className="h-[42rem] overflow-y-scroll">
          {children}
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button variant="text" color="blue-gray" onClick={handleOpen}>
            Close
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default LongDialog;
