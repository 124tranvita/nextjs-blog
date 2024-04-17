import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import connect, { mongooseConnectState } from "@/common/lib/_mongodb";
import User from "../_lib/models/user";
import handleErrors from "../_lib/utils/error-handler";
import AppError from "../_lib/utils/app-error";
import createSendToken from "../_lib/utils/jwt-handler";

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
      return handleErrors(
        new AppError("Please provide email and password!", 400)
      );
    }

    // 2) Check if user exists && password is correct
    /**By default, select for password is set to false.
     * Need to add select('+password) to set select to true. */
    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.correctPassword(password, user.password))) {
      return handleErrors(new AppError("Incorrect email or password", 401));
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
    return Response.json(
      {
        status: "success",
      },
      { status: 201 }
    );
  } catch (error: Error | any) {
    return handleErrors(error);
  }
}
