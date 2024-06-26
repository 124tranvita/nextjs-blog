import React, { ButtonHTMLAttributes } from "react";
import classNames from "classnames";
import { Link } from "../custom-link";

enum Variant {
  Primary = "primary",
  Success = "success",
  Danger = "danger",
  Black = "black",
}

const VariantMap = {
  [Variant.Primary]:
    "bg-blue-500 text-white hover:bg-blue-700 dark:bg-slate-600",
  [Variant.Success]: "bg-green-100 text-green-900 hover:bg-green-200",
  [Variant.Danger]: "bg-red-500 hover:bg-red-700 text-white",
  [Variant.Black]: "bg-gray-900 text-white hover:bg-gray-700",
};

// const Disabled = "bg-slate-200 text-slate-400 hover:bg-slate-200";

type ButtonProps = {
  label?: string | React.ReactNode;
  variant: "primary" | "success" | "danger" | "black";
  onClick?: () => void;
  fullWidth?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: React.FC<ButtonProps> = ({
  label,
  type = "button",
  variant,
  disabled = false,
  fullWidth = false,
  onClick,
}) => {
  return (
    <div className={`${fullWidth ? "w-full" : ""} mt-4`}>
      <button
        type={type}
        className={classNames(
          "inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-md font-bold focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
          VariantMap[variant],
          `${
            disabled
              ? "bg-slate-200 dark:bg-slate-200 text-slate-400 dark:text-slate-300"
              : ""
          }`,
          `${fullWidth ? "w-full" : ""}`
        )}
        onClick={onClick}
        disabled={disabled}
        data-tooltip-target="tooltip-default"
      >
        {label}
      </button>
    </div>
  );
};

type FloatIconWithTooltipProps = {
  icon: React.ReactNode;
  tooltip: string;
  variant: "primary" | "success" | "danger" | "black";
  pathname?: string;
  replace?: boolean;
  onClick?: () => void;
};

export const FloatIconWithTooltip: React.FC<FloatIconWithTooltipProps> = ({
  icon,
  tooltip,
  variant = "primary",
  pathname = "",
  replace = false,
  onClick,
}) => {
  if (!pathname) {
    return (
      <div className="has-tooltip">
        <button
          onClick={onClick}
          className={classNames(
            "h-12 w-12 rounded-full shadow-lg mb-3",
            VariantMap[variant]
          )}
        >
          {icon}
        </button>
        <span className="tooltip rounded p-1 bg-gray-900 text-gray-100">
          {tooltip}
        </span>
      </div>
    );
  }
  return (
    <div className="has-tooltip">
      <Link href={pathname} replace={replace}>
        <button
          onClick={onClick}
          className={classNames(
            "h-12 w-12 rounded-full shadow-lg mb-3",
            VariantMap[variant]
          )}
        >
          {icon}
        </button>
      </Link>
      <span className="tooltip rounded p-1 bg-gray-900 text-gray-100">
        {tooltip}
      </span>
    </div>
  );
};
