"use server";

import { redirect } from "next/navigation";
import { Post } from "@/app/lib/model";

export async function createPost(
  data: Omit<Post, "_id" | "createdAt" | "updatedAt">
): Promise<Post> {
  const { title, cover, content, author } = data;
  const res = await fetch("https://3000.nezumi.asia/api/post", {
    method: "POST",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      cover,
      content,
      author,
    }),
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  const { insertedId } = await res.json();

  redirect(`/post/${insertedId}`);
}

export async function editPost(
  data: Omit<Post, "createdAt" | "updatedAt" | "author">
): Promise<Post> {
  const { _id, title, cover, content } = data;

  const res = await fetch(`https://3000.nezumi.asia/api/post?id=${_id}`, {
    method: "PATCH",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      cover,
      content,
    }),
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  redirect(`/post/${_id}`);
}

export async function getPosts(): Promise<Post[]> {
  const res = await fetch("https://3000.nezumi.asia/api/post", {
    method: "GET",
    cache: "no-cache",
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export async function getPost(id: string): Promise<Post> {
  const res = await fetch(`https://3000.nezumi.asia/api/post?id=${id}`, {
    method: "GET",
    cache: "no-cache",
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export async function deletePost(id: string): Promise<Post> {
  const res = await fetch(`https://3000.nezumi.asia/api/post?id=${id}`, {
    method: "DELETE",
    cache: "no-cache",
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  redirect(`/`);
}
