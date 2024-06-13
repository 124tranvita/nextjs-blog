import User from "../models/user";
import handleErrors from "../utils/error-handler";
import AppError from "../utils/app-error";
import createSendToken, { decodedJwtToken } from "../utils/jwt-handler";

/**
 * Decoded Jwt Token
 * @param token - Token
 * @returns - `Promise` Valid user
 */
export const checkAuthorization = async (token: string): Promise<any> => {
  try {
    // Check if token is existed
    if (!token) {
      return handleErrors(new AppError("EAUTH4013", 401));
    }

    // Decoded token
    const decoded = await decodedJwtToken(token);

    // Find user belong to token
    const user = await User.findById(decoded.id);

    // 4. Check if token belong to valid user
    if (!user) {
      return handleErrors(new AppError("EAUTH4014", 401));
    }

    return user;
  } catch (error: Error | any) {
    return { error: error.message };
  }
};

/**
 * Login user
 * @param email - User's email
 * @param password - User's password
 * @returns - User's info and access token
 */
export const loginUsr = async (
  email: string,
  password: string
): Promise<any> => {
  try {
    // 1) Check if user exists && password is correct
    /**By default, select for password is set to false.
     * Need to add select('+password) to set select to true. */
    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.correctPassword(password, user.password))) {
      return handleErrors(new AppError("EAUTH4012", 401));
    }

    // 2) If everything ok, send token to client
    const { token } = createSendToken(user);

    return { user, token };
  } catch (error: Error | any) {
    return { error: error.message };
  }
};

export const find = async () => {
  return await User.find().exec();
};

export const findById = async (id: string) => {
  return await User.findById(id).exec();
};
