import { unknown } from "zod";
import { cookieOptions } from "./types";

/**
 * Check object has path
 * @param obj - Check object
 * @param path - Check path
 * @returns - True if path is existing
 */
export const hasPath = (obj: Object, path: string | string[]) => {
  let value: any;

  if (path instanceof Array) {
    path.forEach((item: string) => {
      if (!value) {
        value = obj[item as keyof typeof obj];
      } else {
        value = value[item];
      }
    });
  } else {
    value = obj[path as keyof typeof obj];
  }

  return Boolean(value);
};

/**
 * Get the value of object base on given path
 * @param obj - Object
 * @param path - Path
 * @returns - The value base on given path
 */
export const getPathValue = (obj: Object, path: string | string[]) => {
  let value: any;

  if (path instanceof Array) {
    path.forEach((item: string) => {
      if (!value) {
        value = obj[item as keyof typeof obj];
      } else {
        value = value[item];
      }
    });
  } else {
    value = obj[path as keyof typeof obj];
  }

  return value ? value : "";
};

/**
 * Parse the cookie array into cookie object
 * @param cookies - The array of cookies
 * @returns - The object format of cookies array.
 */
export const cookieParse = (cookies: string[]) => {
  const obj: any = {};

  cookies.forEach((item) => {
    // The pair of cookie value be like `key=value`
    const key = item.split("=")[0];
    const value = item.split("=")[1];

    // Note: Decodes a Uniform Resource Identifier (URI) component if setted
    obj[key] = decodeURIComponent(value);
  });

  return obj;
};

/**
 * Serialize cookie value
 * @param key - Key name
 * @param value - Value
 * @param options - Cookie options
 * @returns - The cookie string
 */
export const cookieSerialize = (
  key: string,
  value: string,
  options: cookieOptions
) => {
  // Note: Encodes a URI
  let updatedCookie = encodeURIComponent(key) + "=" + encodeURIComponent(value);

  // Set default path to "/"
  options = { ...options, path: "/" };

  // Hanlde expires if is an intance of Date
  if (options.expires && options.expires instanceof Date) {
    updatedCookie += `; expires=${options.expires.toUTCString()}`;
    // Delete expires property as already pushed to the `updatedCookie` string
    delete options.expires;
  }

  // Serialize cookie options
  for (const [key, value] of Object.entries(options)) {
    updatedCookie += `; ${key}`;

    if (value !== true) {
      updatedCookie += `=${value}`;
    }
  }

  // Replace some option's key to correct cookie format
  return updatedCookie
    .replace("maxAge", "max-age")
    .replace("sameSite", "samesite");
};

export const isObjectEmpty = (objectName: object) => {
  return Object.keys(objectName).length === 0;
};
