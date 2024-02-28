import React, { useMemo, FC } from "react";
import JoditEditor from "jodit-react";
import { Jodit as JoditModules } from "jodit/esm/index";

type Props = {
  onBlur: (newContent: string) => void;
  initialValue?: string;
  placeholder?: string;
};

const Jodit: FC<Props> = ({ initialValue, onBlur, placeholder }) => {
  const config = useMemo(() => {
    return {
      readonly: false, // all options from https://xdsoft.net/jodit/docs/,
      height: 600,
      placeholder: placeholder || "Start typings...",
    };
  }, [placeholder]);

  return (
    <JoditEditor
      value={initialValue || ""}
      config={config}
      onBlur={onBlur} // preferred to use only this option to update the content for performance reasons
      onChange={(newContent) => {}}
    />
  );
};

export const joditPlaintextConverter = (content: string) => {
  return JoditModules.modules.Helpers.stripTags(content);
};

export default Jodit;
