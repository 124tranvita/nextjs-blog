// app/new/page.tsx
import { Metadata } from "next";
import NewPost from "./components/new-post";

// Static metadata
export const metadata: Metadata = {
  title: "New post",
  description: "Create new post",
};

export default function Page() {
  return (
    <main className="max-w-screen-lg min-h-screen p-6 mx-auto  overflow-hidden">
      <NewPost />
    </main>
  );
}
