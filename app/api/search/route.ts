import clientPromise from "../../lib/mongodb";

export const dynamic = "force-dynamic"; // defaults to auto
export async function GET(request: Request) {
  try {
    /** Connect to database */
    const client = await clientPromise;
    const db = client.db("blog");

    /** Get query params */
    const url = new URL(request.url);
    const searchTerm = url.searchParams.get("searchTerm");

    /** Query by search params */
    if (searchTerm) {
      const posts = await db
        .collection("posts")
        .aggregate([
          {
            $search: {
              index: "search_posts",
              text: {
                query: searchTerm,
                path: ["title"],
              },
            },
          },
        ])
        .toArray();

      return Response.json(posts);
    }
  } catch (e: Error | any) {
    console.error(e);
    throw new Error(e).message;
  }
}