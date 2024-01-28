import React, { ButtonHTMLAttributes } from "react";
import classNames from "classnames";

enum Variant {
  Primary = "primary",
  Success = "success",
  Danger = "danger",
}

const VariantMap = {
  [Variant.Primary]: "bg-gray-900 text-white hover:bg-blue-200",
  [Variant.Success]: "bg-green-100 text-green-900 hover:bg-green-200",
  [Variant.Danger]: "bg-red-100 text-red-900 hover:bg-red-200",
};

// const Disabled = "bg-slate-200 text-slate-400 hover:bg-slate-200";

type ButtonProps = {
  label?: string | React.ReactNode;
  variant: "primary" | "success" | "danger";
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
          `${disabled ? "bg-slate-200 hover:bg-slate-200 text-slate-400" : ""}`,
          `${fullWidth ? "w-full" : ""}`
        )}
        onClick={onClick}
        disabled={disabled}
      >
        {label}
      </button>
    </div>
  );
};
