"use server";

import { promises as fs } from "fs";
import { redirect } from "next/navigation";
import { Post } from "@/app/lib/model";

export async function createPost(formData: FormData): Promise<Post> {
  const res = await fetch(`${process.env.URL}/api/post`, {
    method: "POST",
    cache: "no-cache",
    body: formData,
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

  const res = await fetch(`${process.env.URL}/api/post?id=${_id}`, {
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
  const res = await fetch(`${process.env.URL}/api/post`, {
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
  const res = await fetch(`${process.env.URL}/api/post?id=${id}`, {
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
  const res = await fetch(`${process.env.URL}/api/post?id=${id}`, {
    method: "DELETE",
    cache: "no-cache",
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  redirect(`/`);
}

export async function getSearchPosts(searchTerm: string): Promise<Post[]> {
  const res = await fetch(
    `${process.env.URL}/api/search?searchTerm=${searchTerm}`,
    {
      method: "GET",
      cache: "no-cache",
    }
  );

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export async function uploadImg(formData: FormData) {
  const res = await fetch(`${process.env.URL}/api/upload`, {
    method: "POST",
    cache: "no-cache",
    body: formData,
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
}

export async function fetchImage(url: string) {
  const res = await fetch(url, {
    method: "GET",
    cache: "no-cache",
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  const blob = await res.blob();

  let buffer = Buffer.from(await blob.arrayBuffer());

  return "data:" + blob.type + ";base64," + buffer.toString("base64");

  // https://stackoverflow.com/questions/54099802/blob-to-base64-in-nodejs-without-filereader
}
