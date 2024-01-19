"use client";

import { FC } from "react";
import EditPost from "./components/edit-post";

type Props = {
  title: string;
  cover: string;
  content: string;
};

const Page: FC<Props> = ({ title, cover, content }) => {
  return (
    <main className="max-w-screen-lg min-h-screen p-6 mx-auto overflow-hidden">
      <EditPost
        title="Test edit"
        cover="https://images.unsplash.com/photo-1485470733090-0aae1788d5af?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2717&q=80"
        content="<h1>Test tes test</h1>"
      />
    </main>
  );
};

export default Page;
