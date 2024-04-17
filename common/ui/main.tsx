// @/common/ui/main.tsx

import { ReactNode } from "react";
import { cookies } from "next/headers";
import { Container } from "../components/common/container";
import SideControl from "../components/side-control";

type Props = {
  children: ReactNode;
};

export default function Main({ children }: Props) {
  const isSignedIn = cookies().get("isSignedIn")?.value;

  return (
    <Container>
      {children}
      {Boolean(isSignedIn) && <SideControl />}
    </Container>
  );
}
