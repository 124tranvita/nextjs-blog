// @/common/ui/main.tsx

import { ReactNode } from "react";
import { Container } from "../components/common/container";
import SideControl from "../components/side-control";

type Props = {
  children: ReactNode;
  id?: string;
  coverImgFileId?: string;
  mainPage?: boolean;
};

export default function Main({
  children,
  id = "",
  coverImgFileId = "",
  mainPage = false,
}: Props) {
  return (
    <Container>
      {children}
      <SideControl
        id={id}
        coverImgFileId={coverImgFileId}
        mainPage={mainPage}
      />
    </Container>
  );
}
