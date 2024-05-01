// @/common/ui/main.tsx

import { ReactNode } from "react";
import { Container } from "../components/common/container";
import SideControl from "../components/side-control";

type Props = {
  children: ReactNode;
  postId?: string;
  belongUsr?: boolean;
  coverImgFileId?: string;
  mainPage?: boolean;
};

export default function Main({
  children,
  postId = "",
  belongUsr = false,
  coverImgFileId = "",
  mainPage = false,
}: Props) {
  return (
    <Container>
      {children}
      <SideControl
        postId={postId}
        belongUsr={belongUsr}
        coverImgFileId={coverImgFileId}
        mainPage={mainPage}
      />
    </Container>
  );
}
