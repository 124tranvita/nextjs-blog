// api/_lib/utils/jwt-hanlder.js

import * as jwt from "jsonwebtoken";
import { promisify } from "node:util";

/**
 * Create JWT sign token
 * @param {string} id
 * @returns
 */
const signToken = (id) => {
  if (!process.env.JWT_SECRET) {
    throw new Error('Invalid environment variable: "JWT_SECRET"');
  }

  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "15m",
  });
};

const createSendToken = (user) => {
  const token = signToken(user._id);

  // Remove password from output
  user.password = undefined;

  return { token };
};

export const decodedJwtToken = async (token) => {
  return await promisify(jwt.verify)(token, process.env.JWT_SECRET);
};

export default createSendToken;
