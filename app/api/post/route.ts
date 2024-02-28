// app/api/post
import { ObjectId } from "mongodb";
import { connectToDb } from "@/app/lib/mongodb";
import { fileUpload } from "@/app/lib/google-drive";
import { blodToReadable } from "@/app/lib/utils";

export const dynamic = "force-dynamic"; // defaults to auto

/**
 * GET Request (Query all posts, Query post by id params)
 * @param request - Request data
 * @returns - Respone (list of queried post)
 */
export async function GET(request: Request) {
  try {
    /** Connect to database */
    const { client } = await connectToDb();
    const db = client.db("blog");

    /** Get query params */
    const url = new URL(request.url);
    const id = url.searchParams.get("id");

    /** Query by search params */
    if (id) {
      const post = await db.collection("posts").findOne({
        _id: new ObjectId(id),
      });

      return Response.json(post);
    }

    /** Query all posts */
    const posts = await db.collection("posts").find({}).limit(20).toArray();

    return Response.json(posts);
  } catch (e: Error | any) {
    console.error(e);
    throw new Error(e).message;
  }
}

/**
 * POST Request (Create new post)
 * @param request - Request data
 * @returns - Response (new created post)
 */
export async function POST(request: Request) {
  try {
    /** Connect to database */
    const { client } = await connectToDb();
    const db = client.db("blog");

    /** Get request body */
    const formData = await request.formData();

    const title = formData.get("title") as string;
    const coverImg = formData.get("coverImg") as Blob;
    const content = formData.get("content") as string;
    const author = formData.get("author") as string;

    const readable = await blodToReadable(coverImg);

    const googleFileId = await fileUpload(title, coverImg.type, readable);

    /** Create post */
    const post = await db.collection("posts").insertOne({
      title,
      coverImgFileId: googleFileId,
      content,
      author,
      createdAt: new Date(),
    });

    return Response.json(post);
  } catch (error: Error | any) {
    console.error(error);
    throw new Error(error).message;
  }
}

/**
 * PATH Request (Edit selected post)
 * @param request - Request data
 * @returns - Response (New updated post)
 */
export async function PATCH(request: Request) {
  try {
    /** Connect to database */
    const { client } = await connectToDb();
    const db = client.db("blog");

    /** Get query params */
    const url = new URL(request.url);
    const id = url.searchParams.get("id");

    /** Check if post is exsiting */
    if (!id) {
      throw new Error("Id not found");
    }

    /** Get request body */
    const formData = await request.formData();

    const title = formData.get("title") as string;
    const coverImg = formData.get("coverImg") as Blob;
    const content = formData.get("content") as string;

    const readable = await blodToReadable(coverImg);

    const googleFileId = await fileUpload(title, coverImg.type, readable);

    /** Update post */
    const post = await db.collection("posts").updateOne(
      {
        _id: new ObjectId(id),
      },
      {
        $set: {
          title: title,
          coverImgFileId: googleFileId,
          content: content,
          updatedAt: new Date(),
        },
      }
    );

    return Response.json(post);
  } catch (error: Error | any) {
    console.error(error);
    throw new Error(error).message;
  }
}

/**
 * DELETE Request
 * @param request - Request data
 * @returns - Response (deleted post)
 */
export async function DELETE(request: Request) {
  try {
    /** Connect to database */
    const { client } = await connectToDb();
    const db = client.db("blog");

    /** Get query params */
    const url = new URL(request.url);
    const id = url.searchParams.get("id");

    /** Check if post is exsiting */
    if (!id) {
      throw new Error("Post not found.");
    }

    /** Delete post */
    const post = await db.collection("posts").deleteOne({
      _id: new ObjectId(id),
    });

    return Response.json(post);
  } catch (error: Error | any) {
    console.error(error);
    throw new Error(error).message;
  }
}
