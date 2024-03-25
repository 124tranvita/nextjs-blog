// app/[lang]/login/page.tsx

import { Suspense } from "react";
import { Metadata } from "next";
import { Main } from "@/components/common";
import { NextPageLoading } from "../loader";
import Login from "./components/log-in";

// Static metadata
export const metadata: Metadata = {
  title: "Login",
  description: "User login page",
};

export default function Page() {
  return (
    <Suspense fallback={<NextPageLoading />}>
      <Main>
        <Login />
      </Main>
    </Suspense>
  );
}
