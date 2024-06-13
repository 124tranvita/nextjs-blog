// app/[lang]/actions.ts
"use server";

import { cookies } from "next/headers";
import { deleteFile } from "@/app/common/lib/google-drive";
import { decrypt, encrypt } from "@/app/common/lib/crypto";
import { revalidatePath } from "next/cache";
import { processGoogleFileId } from "./app/api/_lib/utils/utils";
import connect, { mongooseConnectState } from "./app/common/lib/_mongodb";
import * as userService from "./app/api/_lib/services/user";
import * as postService from "./app/api/_lib/services/post";

/**
 * Actions: `Create` Post
 * @param formData - Request FormData
 * @returns - Redirect to post detail page
 */
export async function createPost(formData: FormData) {
  try {
    /** Connect to database */
    if (mongooseConnectState() === "disconnected") {
      await connect();
    }

    // Get session data
    const encryptedSessionData = cookies().get("session")?.value;
    const sessionData: any = encryptedSessionData
      ? JSON.parse(decrypt(encryptedSessionData))
      : null;

    // Check user authentication
    const res = await userService.checkAuthorization(sessionData.jwt);

    if (res.error) {
      throw new Error(res.error);
    }

    // Get data from FormData
    const title = formData.get("title") as string;
    const localImg = formData.get("localImg") as Blob;

    // Get `goolge file id`
    const googleFileId = await processGoogleFileId(localImg, title);

    // Create `post dto`
    const createPostDto = {
      title: formData.get("title") as string,
      localImg: googleFileId,
      cloudImg: formData.get("cloudImg") as string,
      content: formData.get("content") as string,
      author: sessionData.user._id,
    };

    // Create post
    const post = await postService.create(createPostDto);

    return JSON.stringify({ data: post, message: "success" });
  } catch (error: Error | any) {
    return JSON.stringify({ error: error.message, message: "error" });
  }
}

/**
 * Actions: `Edit` Post
 * @param formData - Request FormData
 * @returns - Redirect to current post detail page
 */
export async function editPost(
  id: string,
  formData: FormData,
  oldLocalImg?: string
) {
  try {
    /** Connect to database */
    if (mongooseConnectState() === "disconnected") {
      await connect();
    }

    // Get session data
    const encryptedSessionData = cookies().get("session")?.value;
    const sessionData: any = encryptedSessionData
      ? JSON.parse(decrypt(encryptedSessionData))
      : null;

    // Check user authentication
    const res = await userService.checkAuthorization(sessionData.jwt);

    if (res.error) {
      throw new Error(res.error);
    }

    // Check if post belong to user
    const result = await postService.findByCondition({
      _id: id,
      author: res._id,
    });

    if (!result || result.length < 1) {
      throw new Error("EPOST4031");
    }

    // Get data from FormData
    const title = formData.get("title") as string;
    const localImg = formData.get("localImg") as Blob;
    const cloudImg = formData.get("cloudImg") as string;
    const content = formData.get("content") as string;

    // Get `goolge file id`
    const googleFileId = await processGoogleFileId(localImg, title);

    // Create `update dto`
    const updatePostDto = {
      title: formData.get("title") as string,
      localImg: googleFileId ? googleFileId : result[0].localImg,
      cloudImg: cloudImg ? cloudImg : result[0].cloudImg,
      content: content,
      updatedAt: new Date(),
    };

    // Update post
    const post = await postService.findByIdAndUpdate(id, updatePostDto);

    // If `oldLocalImg`: Delete previous image on drive
    if (oldLocalImg) {
      await deleteFile(oldLocalImg);
    }

    return JSON.stringify({ data: post, message: "success" });
  } catch (error: Error | any) {
    return JSON.stringify({ error: error.message, message: "error" });
  }
}

/**
 * Actions: `Get` list of posts
 * @param page - Page number
 * @param limit - Limit number
 * @returns - List of posts
 */
export async function getPosts(page: number, limit: number) {
  try {
    if (mongooseConnectState() === "disconnected") {
      await connect();
    }

    const posts = await postService.find(page, limit);

    revalidatePath("/");
    return JSON.stringify({ data: posts, message: "success" });
  } catch (error: Error | any) {
    return JSON.stringify({ error: error.message, message: "error" });
  }
}

/**
 * Actions: `Get` single post
 * @param id - Post's id
 * @returns  - Single detail post
 */
export async function getPost(id: string) {
  try {
    if (mongooseConnectState() === "disconnected") {
      await connect();
    }

    const post = await postService.findById(id);

    return JSON.stringify({ data: post, message: "success" });
  } catch (error: Error | any) {
    return JSON.stringify({ error: error.message, message: "error" });
  }
}

/**
 * Actions: `Delete` single post
 * @param id - Post's id
 * @param localImg - Local imge file Id
 * @returns  - Deleted post
 */
export async function deletePost(id: string, localImg: string = "") {
  try {
    /** Connect to database */
    if (mongooseConnectState() === "disconnected") {
      await connect();
    }

    // Get session data
    const encryptedSessionData = cookies().get("session")?.value;
    const sessionData: any = encryptedSessionData
      ? JSON.parse(decrypt(encryptedSessionData))
      : null;

    // Check user authentication
    const res = await userService.checkAuthorization(sessionData.jwt);

    if (res.error) {
      throw new Error(res.error);
    }

    // Delete post
    const post = await postService.findByIdAndDelete(id);

    /** If `localImg`: Delete from google drive */
    if (localImg) {
      await deleteFile(localImg);
    }

    return JSON.stringify({ data: post, message: "success" });
  } catch (error: Error | any) {
    return JSON.stringify({ error: error.message, message: "error" });
  }
}

/**
 * Actions: `Search` posts by given keyword
 * @param searchTerm - Search keyworld
 * @param page - Page number
 * @param limit - Limit number
 * @returns - List of posts
 */
export async function getSearchPosts(
  searchTerm: string,
  page: number,
  limit: number
) {
  try {
    /** Connect to database */
    if (mongooseConnectState() === "disconnected") {
      await connect();
    }

    const posts = await postService.searchPosts(searchTerm, page, limit);

    console.log(posts);

    return JSON.stringify({ data: posts, message: "success" });
  } catch (error: Error | any) {
    return JSON.stringify({ error: error.message, message: "error" });
  }
}

/**
 * Action: `Login` user
 * @param formData - Request FormData
 * @returns - Success if use is logged in
 */
export async function login(formData: FormData) {
  try {
    if (mongooseConnectState() === "disconnected") {
      await connect();
    }

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const res = await userService.loginUsr(email, password);

    const encryptedSessionData = encrypt({
      jwt: res.token,
      user: res.user,
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

    return { data: undefined, message: "success" };
  } catch (error: Error | any) {
    return { error: error.message, message: "error" };
  }
}

/**
 * User logout
 * @returns - Redirect to main page
 */
export async function logout(): Promise<any> {
  cookies().delete("session");
  revalidatePath("/");

  return { status: 200 };
}

export async function getUser(id: string) {
  try {
    if (mongooseConnectState() === "disconnected") {
      await connect();
    }

    const user = await userService.findById(id);

    return JSON.stringify({ data: user, message: "success" });
  } catch (error: Error | any) {
    return JSON.stringify({ error: error.message, message: "error" });
  }
}

/**
 * Fetch image from public link
 * @param url - Image link
 * @returns - Image data as Blob format
 */
export async function fetchImage(url: string) {
  try {
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
  } catch (error: Error | any) {
    return { error: error.message, status: 401 };
  }
}
