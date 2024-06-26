// app/[lang]/login/page.tsx

import { Suspense } from "react";
import { Metadata } from "next";
import Login from "@/app/common/ui/login";
import { Loader } from "../loader";

export const dynamic = "force-dynamic";

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
