"use client";

import { FC, useState } from "react";
import { Post } from "@/common/model";
import NewPost from "./components/new-post";

const Home: FC = () => {
  const [data, setData] = useState<Post[]>([]);

  return (
    <main className="max-w-screen-lg min-h-screen p-6 mx-auto  overflow-hidden">
      <NewPost />
    </main>
  );
};

export default Home;
