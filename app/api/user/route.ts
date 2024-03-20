import connect from "@/app/lib/_mongodb";
import User from "../_lib/models/user";
import handleErrors from "../_lib/utils/error-handler";

/**
 * POST Request (Create new user)
 * @param request - Request data
 * @returns - Response (new created user)
 */
export async function POST(request: Request) {
  try {
    /** Connect to database */
    await connect();
    /** Get request body */
    const formData = await request.formData();

    const email = formData.get("email") as string;
    const name = formData.get("name") as string;
    const password = formData.get("password") as string;
    const passwordConfirm = formData.get("passwordConfirm") as string;

    /** Create post */
    const user = await User.create({
      email,
      name,
      password,
      passwordConfirm,
      createdAt: new Date(),
    });

    return Response.json(user);
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
    /** Connect to database */
    await connect();

    /** Get query params */
    const url = new URL(request.url);
    const id = url.searchParams.get("id");

    /** Check if post is exsiting */
    if (!id) {
      throw new Error("Post not found.");
    }

    /** Delete post */
    const user = await User.findByIdAndDelete(id);

    return Response.json(user);
  } catch (error: Error | any) {
    return handleErrors(error);
  }
}
