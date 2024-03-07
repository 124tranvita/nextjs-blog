// app/new/page.tsx
import { Metadata } from "next";
import NewPost from "./components/new-post";
// import { NextPageLoading } from "../loader";

// Static metadata
export const metadata: Metadata = {
  title: "New post",
  description: "Create new post",
};

export default function Page() {
  return (
    <main className="relative max-w-screen-lg min-h-screen p-6 mx-auto  overflow-hidden">
      {/* <NextPageLoading /> */}
      <NewPost />
    </main>
  );
}
