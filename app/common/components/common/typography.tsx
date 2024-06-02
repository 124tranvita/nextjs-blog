import classNames from "classnames";

type TypographyProps = {
  text: string;
  type: "title" | "description" | "base" | "muted" | "name";
  size?: "normal" | "small" | "large" | "subtext";
};

enum Size {
  Normal = "normal",
  Small = "small",
  Large = "large",
  Subtext = "subtext",
}

enum Type {
  Title = "title",
  Description = "description",
  Name = "name",
  Muted = "muted",
  Base = "base",
}

const SizeMap = {
  [Size.Large]: "text-xl",
  [Size.Small]: "text-xs",
  [Size.Normal]: "text-md",
  [Size.Subtext]: "text-sm",
};

const TypeMap = {
  [Type.Title]:
    "font-bold mb-3 text-3xl md:text-4xl lg:text-[3rem] sm:tracking-tight text-gray-900 dark:text-gray-100",
  [Type.Description]: "text-gray-500 mb-3 text-lg",
  [Type.Name]: "text-slate-600 font-semibold",
  [Type.Muted]: "text-slate-400",
  [Type.Base]: "text-slate-600",
};

/** Typography */
const Typography: React.FC<TypographyProps> = ({
  text,
  type = "base",
  size = "normal",
}) => {
  return (
    <div className="flex items-center justify-center">
      <p className={classNames(TypeMap[type], SizeMap[size])}>{text}</p>
    </div>
  );
};

export default Typography;
