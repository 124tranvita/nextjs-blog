import {
  ComponentPropsWithRef,
  FC,
  ForwardedRef,
  ReactNode,
  forwardRef,
} from "react";
import MovePageLoadingSkeleton from "./loading-skeleton/move-page-loading-skeleton";

interface Props extends ComponentPropsWithRef<"section"> {
  children: ReactNode;
  isMoveNext?: boolean;
}

type Ref = ForwardedRef<HTMLDivElement>;

export const Main: FC<Props> = ({ children }) => {
  return (
    <section className="relative lg:mt-[75px] overflow-y-scroll">
      {children}
    </section>
  );
};

export const Article = forwardRef(function (props: Props, ref: Ref) {
  const { children, isMoveNext } = props;
  return (
    <>
      {isMoveNext && <MovePageLoadingSkeleton />}
      <section
        className="relative max-w-screen-md mx-auto py-8 pb-0 px-4 md:px-8"
        ref={ref}
      >
        {children}
      </section>
    </>
  );
});

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

Article.displayName = "Article";
