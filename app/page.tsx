"use client";

import { FC, useEffect, useState } from "react";
import { POST } from "@/assets/dev/data";
import { Post } from "@/common/model";
import HomePost from "./components/home-post";

const Home: FC = () => {
  const [data, setData] = useState<Post[]>([]);
  useEffect(() => {
    console.log("CLIENT RENDER");
    setData(POST);
  }, []);
  return (
    <main className="max-w-screen-md min-h-screen p-6 mx-auto overflow-hidden">
      {data.map((post, index) => (
        <HomePost key={index} post={post} />
      ))}
    </main>
  );
};

export default Home;
