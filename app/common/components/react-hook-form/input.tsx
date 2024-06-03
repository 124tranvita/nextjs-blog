import { FieldErrors } from "react-hook-form";
import { ComponentPropsWithRef, ForwardedRef, forwardRef } from "react";
import classNames from "classnames";
import React from "react";

interface Props extends ComponentPropsWithRef<"input"> {
  name: string;
  label: string;
  errors: FieldErrors<any>;
}

export type Ref = ForwardedRef<HTMLInputElement>;

const Input = forwardRef(function (props: Props, ref: Ref) {
  const { name, label, errors } = props;

  const hasError = errors && errors[name];

  return (
    <div className="mb-5">
      <label
        htmlFor={name}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <input
        ref={ref}
        className={`${
          hasError ? "border-red-500" : "border-gray-300"
        } border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"`}
        {...props}
      />
      {hasError && (
        <p className="mt-2 text-sm text-red-500">
          {errors[name]?.message?.toString()}
        </p>
      )}
    </div>
  );
});

Input.displayName = "Input";

export default Input;
