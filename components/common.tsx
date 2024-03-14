import { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const Main: FC<Props> = ({ children }) => {
  return <main className="h-screen pb-40 overflow-y-scroll">{children}</main>;
};

export const Article: FC<Props> = ({ children }) => {
  return (
    <section className="relative max-w-screen-md mx-auto my-12">
      {children}
    </section>
  );
};

export const EditorContainer: FC<Props> = ({ children }) => {
  return (
    <section className="relative max-w-screen-lg mx-auto my-12">
      {children}
    </section>
  );
};
