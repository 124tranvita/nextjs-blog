// app/[lang]/login/page.tsx

import { Suspense } from "react";
import { Metadata } from "next";
import Login from "@/common/ui/login/log-in";
import { Loader } from "../loader";

// Static metadata
export const metadata: Metadata = {
  title: "Login",
  description: "User login page",
};

export default function Page() {
  return (
    <Suspense fallback={<Loader />}>
      <Login />
    </Suspense>
  );
}
