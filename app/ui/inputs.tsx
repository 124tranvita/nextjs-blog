import classNames from "classnames";
import { ComponentPropsWithoutRef, FC } from "react";

interface InputGroupProps extends ComponentPropsWithoutRef<"input"> {
  name: string;
  type: string;
  className?: string;
}

export const BasicInput: FC<InputGroupProps> = ({
  name,
  type,
  className,
  ...props
}) => {
  return (
    <>
      <input
        type={type}
        name={name}
        id={name}
        className={classNames(
          "block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
          className
        )}
        {...props}
      />
    </>
  );
};
