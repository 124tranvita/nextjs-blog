// app/[lang]/actions.ts
"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { deleteFile } from "./common/lib/google-drive";
import { cookies } from "next/headers";
import { CurrentUser, Post } from "@/common/lib/model";
import { decrypt, encrypt } from "./common/lib/crypto";

/**
 * Actions: `Create` Post
 * @param formData - Request FormData
 * @returns - Redirect to post detail page
 */
export async function createPost(formData: FormData): Promise<Post> {
  // Get current locale
  const lang = cookies().get("lang")?.value;
  // Get session data
  const encryptedSessionData = cookies().get("session")?.value;
  const sessionData: any = encryptedSessionData
    ? JSON.parse(decrypt(encryptedSessionData))
    : null;

  // Append required data to FormData
  formData.append("userId", sessionData.user.id);
  formData.append("author", sessionData.user.name);

  // Call `post` api
  const res = await fetch(`${process.env.URL}/api/post`, {
    method: "POST",
    cache: "no-cache",
    body: formData,
  });

  // Ff respone not ok
  if (!res.ok) {
    const error = await res.json();
    // This will activate the closest `error.js` Error Boundary
    throw new Error(error.message);
  }

  // Handle on successfully data
  const data = await res.json();
  redirect(`${process.env.URL}/post/${data.id}?lang=${lang}`);
}

/**
 * Actions: `Edit` Post
 * @param formData - Request FormData
 * @returns - Redirect to current post detail page
 */
export async function editPost(
  id: string,
  formData: FormData,
  fileId: string
): Promise<Post> {
  // Get current locale
  const lang = cookies().get("lang")?.value;
  // Get session data
  const encryptedSessionData = cookies().get("session")?.value;
  const sessionData: any = encryptedSessionData
    ? JSON.parse(decrypt(encryptedSessionData))
    : null;

  // Append required data to FormData
  formData.append("userId", sessionData.user.id);
  formData.append("author", sessionData.user.name);

  // Call `post` api
  const res = await fetch(`${process.env.URL}/api/post?id=${id}`, {
    method: "PATCH",
    cache: "no-cache",
    body: formData,
  });

  // if respone not ok
  if (!res.ok) {
    const error = await res.json();
    // This will activate the closest `error.js` Error Boundary
    throw new Error(error.message);
  }

  // Delete previous cover image on drive
  await deleteFile(fileId);

  // Redirect to post detail page
  redirect(`${process.env.URL}/post/${id}?lang=${lang}`);
}

export async function getPosts(page: number, limit: number): Promise<Post[]> {
  console.log({ page, limit });
  const res = await fetch(
    `${process.env.URL}/api/post?page=${page}&limit=${limit}`,
    {
      method: "GET",
      cache: "no-cache",
    }
  );

  if (!res.ok) {
    const error = await res.json();
    // This will activate the closest `error.js` Error Boundary
    throw new Error(error.message);
  }

  return res.json();
}

export async function getPost(id: string): Promise<Post> {
  const res = await fetch(`${process.env.URL}/api/post?id=${id}`, {
    method: "GET",
    cache: "no-cache",
  });

  if (!res.ok) {
    const error = await res.json();
    // This will activate the closest `error.js` Error Boundary
    throw new Error(error.message);
  }

  return res.json();
}

export async function deletePost(id: string, fileId: string) {
  const res = await fetch(
    `${process.env.URL}/api/post?id=${id}&fileId=${fileId}`,
    {
      method: "DELETE",
      cache: "no-cache",
    }
  );

  if (!res.ok) {
    const error = await res.json();
    // This will activate the closest `error.js` Error Boundary
    throw new Error(error.message);
  }

  redirect(`${process.env.URL}/`);
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

/**
 * User login
 * @param formData - Request FormData
 * @returns - Redirect to main page
 */
export async function login(
  formData: FormData,
  prevLink: string | null
): Promise<CurrentUser> {
  // Get current locale
  const lang = cookies().get("lang")?.value;

  // Call `auth` api
  const res = await fetch(`${process.env.URL}/api/auth`, {
    method: "POST",
    cache: "no-cache",
    body: formData,
    credentials: "include",
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch image data");
  }

  /** Get data from response */
  const data = await res.json();

  const encryptedSessionData = encrypt({
    jwt: data.token,
    user: data.user,
  });

  /** Set session cookie */
  cookies().set("session", encryptedSessionData, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // One week
    path: "/",
  });

  cookies().set("isSignedIn", "1", {
    maxAge: 60 * 60 * 24 * 7, // One week
  });

  /** Return to the previous screen */
  if (prevLink) {
    redirect(`${process.env.URL}/${prevLink}?lang=${lang}`);
  } else {
    // Or redirect to main page
    redirect(`${process.env.URL}/?lang=${lang}`);
  }
}

/**
 * User logout
 * @returns - Redirect to main page
 */
export async function logout(): Promise<any> {
  const res = await fetch(`${process.env.URL}/api/auth`, {
    method: "GET",
    cache: "no-cache",
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  cookies().delete("session");
  /** Return to the main page */
  return res.json();
}
