import React, {
  ComponentPropsWithRef,
  ForwardedRef,
  createRef,
  useImperativeHandle,
  useRef,
} from "react";
import { FieldErrors } from "react-hook-form";
import classNames from "classnames";

interface Props extends ComponentPropsWithRef<"input"> {
  name: string;
  label: string;
  errors: FieldErrors<any>;
}

type Ref = ForwardedRef<HTMLInputElement>;

const FileSelector = React.forwardRef(function (props: Props, ref: Ref) {
  const { name, label, errors } = props;
  const inputRef = createRef<HTMLInputElement>();

  const hasError = errors && errors[name] && errors[name]?.message;

  // useImperativeHandle(
  //   ref, // forwarded ref
  //   function () {
  //     return {
  //       focus() {
  //         inputRef.current.focus();
  //       },
  //       blur() {
  //         inputRef.current.blur();
  //       },
  //     }; // the forwarded ref value
  //   },
  //   []
  // );

  return (
    <>
      <label
        htmlFor={name}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <input
        ref={ref}
        type="file"
        //   multiple
        className={classNames({
          // Modify the Button shape, spacing, and colors using the `file`: directive
          // button colors
          "file:bg-violet-50 file:text-violet-500 hover:file:bg-violet-100":
            true,
          "file:rounded-lg file:rounded-tr-none file:rounded-br-none": true,
          "file:px-4 file:py-2 file:mr-4 file:border-none": true,
          // overall input styling
          "hover:cursor-pointer border w-full border-gray-300 rounded-lg text-gray-400":
            true,
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
