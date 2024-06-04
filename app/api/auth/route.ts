import { NextResponse } from "next/server";
import { headers } from "next/headers";
import connect, { mongooseConnectState } from "@/app/common/lib/_mongodb";
import User from "../_lib/models/user";
import handleErrors from "../_lib/utils/error-handler";
import AppError from "../_lib/utils/app-error";
import createSendToken, { decodedJwtToken } from "../_lib/utils/jwt-handler";

/**
 * POST Request (Login user)
 * @param request - Request data
 * @returns - Response (new created user)
 */
export async function POST(request: Request) {
  try {
    /** Connect to database */
    if (mongooseConnectState() === "disconnected") {
      await connect();
    }

    /** Get request body */
    const formData = await request.formData();

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    // 1) Check if email and password exist
    if (!email || !password) {
      return handleErrors(new AppError("EAUTH4011", 401));
    }

    // 2) Check if user exists && password is correct
    /**By default, select for password is set to false.
     * Need to add select('+password) to set select to true. */
    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.correctPassword(password, user.password))) {
      return handleErrors(new AppError("EAUTH4012", 401));
    }

    // 3) If everything ok, send token to client
    const { token } = createSendToken(user);

    return NextResponse.json(
      {
        status: "success",
        token,
        user,
      },
      { status: 200 }
    );
  } catch (error: Error | any) {
    return handleErrors(error);
  }
}

/**
 * GET Request - Log out
 * @param request - Request data
 * @returns - Respone
 */
export async function GET(request: Request) {
  try {
    const headersList = headers();
    const token = headersList.get("authorization");

    if (!token) {
      return handleErrors(new AppError("EAUTH4013", 401));
    }

    const decoded = await decodedJwtToken(token.split(" ")[1]);

    const user = await User.findById(decoded.id);

    if (!user) {
      return handleErrors(
        new AppError(
          "The user belonging to this token does no longer exist.",
          401
        )
      );
    }

    return Response.json(
      {
        status: "success",
      },
      { status: 200 }
    );
  } catch (error: Error | any) {
    return handleErrors(error);
  }
}
