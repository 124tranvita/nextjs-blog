import { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const Main: FC<Props> = ({ children }) => {
  return (
    <main className="max-w-screen-md min-h-screen p-6 mx-auto overflow-hidden">
      {children}
    </main>
  );
};
