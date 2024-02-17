// app/new/page.tsx
import { Metadata } from "next";
import NewPost from "./components/new-post";

// Static metadata
export const metadata: Metadata = {
  title: "New post",
  description: "Create new post",
};

// const url =
//   "https://images.unsplash.com/photo-1682686581498-5e85c7228119?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

// const fetchData = async () => {
//   const reponse = await fetch(url);
//   const blob = await reponse.blob();
//   console.log({ blob });
// };

export default function Page() {
  return (
    <main className="max-w-screen-lg min-h-screen p-6 mx-auto  overflow-hidden">
      <NewPost />
    </main>
  );
}
