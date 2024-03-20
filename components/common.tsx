import { FC, ReactNode } from "react";
import MovePageLoadingSkeleton from "./loading-skeleton/move-page-loading-skeleton";

type Props = {
  children: ReactNode;
  isMoveNext?: boolean;
};

export const Main: FC<Props> = ({ children }) => {
  return (
    <>
      <main className="h-screen md:mt-0 mt-[75px] pb-40 overflow-y-scroll">
        {children}
      </main>
    </>
  );
};

export const Article: FC<Props> = ({ children, isMoveNext }) => {
  return (
    <>
      {isMoveNext && <MovePageLoadingSkeleton />}
      <section className="relative max-w-screen-md mx-auto my-12">
        {children}
      </section>
    </>
  );
};

export const EditorContainer: FC<Props> = ({ children, isMoveNext }) => {
  return (
    <>
      {isMoveNext && <MovePageLoadingSkeleton />}
      <section className="relative max-w-screen-lg mx-auto my-12">
        {children}
      </section>
    </>
  );
};

export const Form: FC<Props> = ({ children, isMoveNext }) => {
  return (
    <>
      {isMoveNext && <MovePageLoadingSkeleton />}
      <section className="relative max-w-sm mx-auto my-12">{children}</section>
    </>
  );
};
