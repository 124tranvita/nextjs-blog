import connect, { mongooseConnectState } from "@/common/lib/_mongodb";
import Post from "../_lib/models/post";

export const dynamic = "force-dynamic"; // defaults to auto

export async function GET(request: Request) {
  try {
    /** Connect to database */
    if (mongooseConnectState() === "disconnected") {
      await connect();
    }

    /** Get query params */
    const url = new URL(request.url);
    const searchTerm = url.searchParams.get("searchTerm");
    const page = url.searchParams.get("page");
    const limit = url.searchParams.get("limit");

    const skip = (Number(page) - 1) * Number(limit);

    /** Query by search params */
    if (searchTerm) {
      const posts = await Post.aggregate([
        {
          $search: {
            index: "search_posts",
            regex: {
              query: `(.*)${searchTerm}(.*)`,
              path: ["title"],
              allowAnalyzedField: true,
            },
          },
        },
      ])
        .skip(skip)
        .limit(Number(limit))
        .sort({ createdAt: -1 })
        .sort({ updatedAt: -1 });

      return Response.json(posts);
    }
  } catch (e: Error | any) {
    console.error(e);
    throw new Error(e).message;
  }
}
