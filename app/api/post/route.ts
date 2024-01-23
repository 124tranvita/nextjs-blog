import { ObjectId } from "mongodb";
import clientPromise from "../../lib/mongodb";

export const dynamic = "force-dynamic"; // defaults to auto
export async function GET(request: Request) {
  try {
    /** Connect to database */
    const client = await clientPromise;
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

export async function POST(request: Request) {
  try {
    /** Connect to database */
    const client = await clientPromise;
    const db = client.db("blog");

    /** Get request body */
    const { title, cover, content } = await request.json();

    /** Create post */
    const post = await db.collection("posts").insertOne({
      title,
      cover,
      content,
    });

    return Response.json(post);
  } catch (error: Error | any) {
    console.error(error);
    throw new Error(error).message;
  }
}

export async function PATCH(request: Request) {
  try {
    /** Connect to database */
    const client = await clientPromise;
    const db = client.db("blog");

    /** Get query params */
    const url = new URL(request.url);
    const id = url.searchParams.get("id");

    /** Get request body */
    const { title, cover, content } = await request.json();

    /** Check if post is exsiting */
    if (!id) {
      throw new Error("Post not found.");
    }

    /** Update post */
    const post = await db.collection("posts").updateOne(
      {
        _id: new ObjectId(id),
      },
      {
        $set: {
          title: title,
          cover: cover,
          content: content,
        },
      }
    );

    return Response.json(post);
  } catch (error: Error | any) {
    console.error(error);
    throw new Error(error).message;
  }
}

export async function DELETE(request: Request) {
  try {
    /** Connect to database */
    const client = await clientPromise;
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
