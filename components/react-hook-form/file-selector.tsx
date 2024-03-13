import React, { ComponentPropsWithRef, ForwardedRef, useEffect } from "react";
import { FieldErrors } from "react-hook-form";
import classNames from "classnames";

interface Props extends ComponentPropsWithRef<"input"> {
  name: string;
  errors: FieldErrors<any>;
}

type Ref = ForwardedRef<HTMLInputElement>;

const FileSelector = React.forwardRef(function (props: Props, ref: Ref) {
  const { name, errors } = props;
  const hasError = errors && errors[name] && errors[name]?.message;

  return (
    <>
      <input
        ref={ref}
        id={name}
        type="file"
        accept=".jpg, .jpeg, .png"
        className={classNames({
          // Modify the Button shape, spacing, and colors using the `file`: directive
          // button colors
          "file:bg-violet-50 file:text-slate-500 hover:file:bg-violet-100 file:dark:bg-slate-600 file:dark:text-slate-100":
            true,
          "file:rounded-lg": true,
          "file:px-4 file:py-2 file:mr-4 file:border-none": true,
          "text-gray-600 dark:text-gray-100": true,
          // overall input styling
          // "hover:cursor-pointer border w-full border-gray-300 rounded-lg text-gray-400":
          //   true,
        })}
        {...props}
      />
      {hasError && (
        <p className="mt-2 text-sm text-red-800">
          {errors[name]?.message?.toString()}
        </p>
      )}
    </>
  );
});

FileSelector.displayName = "FileSelector";

export default FileSelector;
