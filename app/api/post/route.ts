// app/api/post/route.ts

import connect, { mongooseConnectState } from "@/common/lib/_mongodb";
import { fileUpload } from "@/common/lib/google-drive";
import { blodToReadable } from "@/common/lib/utils";
import Post from "../_lib/models/post";
import User from "../_lib/models/user";
import handleErrors from "../_lib/utils/error-handler";
import AppError from "../_lib/utils/app-error";
import { headers } from "next/headers";
import { decodedJwtToken } from "../_lib/utils/jwt-handler";

export const dynamic = "force-dynamic"; // defaults to auto

/**
 * GET Request (Query all posts, Query post by id )
 * @param request - Request data
 * @returns - Respone (list of queried post)
 */
export async function GET(request: Request) {
  try {
    /** Connect to database */
    if (mongooseConnectState() === "disconnected") {
      await connect();
    }

    /** Get query params */
    const url = new URL(request.url);
    const id = url.searchParams.get("id");
    const page = url.searchParams.get("page");
    const limit = url.searchParams.get("limit");

    /** Query by id */
    if (id) {
      const post = await Post.findById(id);

      return Response.json(post);
    }

    /** Query all posts (with pagination) */
    const skip = (Number(page) - 1) * Number(limit);
    const posts = await Post.find()
      .skip(skip)
      .limit(Number(limit))
      .sort({ createdAt: -1 })
      .sort({ updatedAt: -1 });

    return Response.json(posts);
  } catch (error: Error | any) {
    return handleErrors(error);
  }
}

/**
 * POST Request (Create new post) - Need protected
 * @param request - Request data
 * @returns - Response (new created post)
 */
export async function POST(request: Request) {
  try {
    /** Get token */
    const headersList = headers();
    const token = headersList.get("authorization");

    // 1. Check if token is existed
    if (!token) {
      return handleErrors(
        new AppError("You are not logged in! Please log in to get access.", 401)
      );
    }
    console.log({ token });
    // 2. Decode token
    const decoded = await decodedJwtToken(token.split(" ")[1]);

    // 3. Find user belong to token
    const user = await User.findById(decoded.id);

    // 4. Check if token belong to valid user
    if (!user) {
      return handleErrors(
        new AppError(
          "The user belonging to this token does no longer exist.",
          401
        )
      );
    }

    /** Connect to database */
    if (mongooseConnectState() === "disconnected") {
      await connect();
    }

    /** Get request body */
    const formData = await request.formData();

    const userId = formData.get("userId") as string;
    const title = formData.get("title") as string;
    const coverImg = formData.get("coverImg") as Blob;
    const content = formData.get("content") as string;
    const author = formData.get("author") as string;

    /** Upload image to google drive */
    const readable = await blodToReadable(coverImg);
    const googleFileId = await fileUpload(title, coverImg.type, readable);

    /** Create post */
    const post = await Post.create({
      title,
      coverImgFileId: googleFileId,
      content,
      author,
      createdAt: new Date(),
      user: userId,
    });

    return Response.json(post);
  } catch (error: Error | any) {
    return handleErrors(error);
  }
}

/**
 * PATH Request (Edit selected post)
 * @param request - Request data
 * @returns - Response (New updated post)
 */
export async function PATCH(request: Request) {
  try {
    /** Get token */
    const headersList = headers();
    const token = headersList.get("authorization");

    // 1. Check if token is existed
    if (!token) {
      return handleErrors(
        new AppError("You are not logged in! Please log in to get access.", 401)
      );
    }
    console.log({ token });
    // 2. Decode token
    const decoded = await decodedJwtToken(token.split(" ")[1]);

    // 3. Find user belong to token
    const user = await User.findById(decoded.id);

    // 4. Check if token belong to valid user
    if (!user) {
      return handleErrors(
        new AppError(
          "The user belonging to this token does no longer exist.",
          401
        )
      );
    }

    /** connect to database */
    if (mongooseConnectState() === "disconnected") {
      await connect();
    }

    /** get query params */
    const url = new URL(request.url);
    const id = url.searchParams.get("id");

    /** Get request body */
    const formData = await request.formData();

    const userId = formData.get("userId") as string;
    const title = formData.get("title") as string;
    const coverImg = formData.get("coverImg") as Blob;
    const content = formData.get("content") as string;
    const author = formData.get("author") as string;

    /** if post's id not provide */
    if (!id) {
      return handleErrors(new AppError("Invalid Post's Id.", 400));
    }

    /** if post no belong to current user */
    const checkData = await Post.findOne({
      _id: id,
      user: userId,
    });

    console.log({ checkData });

    if (!checkData) {
      return handleErrors(new AppError("Post not belong to user.", 403));
    }

    /** upload image to google drive */
    const readable = await blodToReadable(coverImg);
    const googleFileId = await fileUpload(title, coverImg.type, readable);

    /** update post */
    const post = await Post.findByIdAndUpdate(id, {
      title,
      coverImgFileId: googleFileId,
      content,
      author,
      updatedAt: new Date(),
    });

    return Response.json(post);
  } catch (error: Error | any) {
    return handleErrors(error);
  }
}

/**
 * DELETE Request
 * @param request - Request data
 * @returns - Response (deleted post)
 */
export async function DELETE(request: Request) {
  try {
    /** Get token */
    const headersList = headers();
    const token = headersList.get("authorization");

    // 1. Check if token is existed
    if (!token) {
      return handleErrors(
        new AppError("You are not logged in! Please log in to get access.", 401)
      );
    }
    console.log({ token });
    // 2. Decode token
    const decoded = await decodedJwtToken(token.split(" ")[1]);

    // 3. Find user belong to token
    const user = await User.findById(decoded.id);

    // 4. Check if token belong to valid user
    if (!user) {
      return handleErrors(
        new AppError(
          "The user belonging to this token does no longer exist.",
          401
        )
      );
    }

    /** connect to database */
    if (mongooseConnectState() === "disconnected") {
      await connect();
    }

    /** Get query params */
    const url = new URL(request.url);
    const id = url.searchParams.get("id");

    /** Check if post is exsiting */
    if (!id) {
      throw new Error("Post not found.");
    }

    /** Delete post */
    const post = await Post.findByIdAndDelete(id);

    return Response.json(post);
  } catch (error: Error | any) {
    return handleErrors(error);
  }
}
