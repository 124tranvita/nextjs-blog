import { Readable } from "stream";

/**
 * Rendering HTML text using dangerouslySetInnerHTML in Next.js
 * @param content - HTML content in plain text
 * @returns
 */
export const createMarkup = (content: string) => {
  return { __html: content };
};

/**
 * Truncate text with the custom length
 * @param text
 * @param maxLength
 * @returns  - Truncated text
 */
export const truncateText = (text: string, maxLength: number) => {
  let truncated = "";

  if (text.length > maxLength) {
    truncated = text.substring(0, maxLength) + "...";
  }
  return truncated;
};

export const classNames = (...classes: any) => {
  return classes.filter(Boolean).join(" ");
};

/**
 * Date formater
 * Timezone refs: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
 * @param value - Input value
 * @returns - Formated result
 */
export const formatDate = (value: Date | string) => {
  return new Date(value).toLocaleString("vi-VN", { timeZone: "Asia/Bangkok" });
};

export const pathNameMapping = (pathName: string) => {
  if (pathName === "/") return "Home";

  const splitted = pathName.split("/");

  const length = splitted.length;

  if (length > 0) {
    if (splitted[length - 1] === "new") {
      return "New Post";
    } else if (splitted[length - 1] === "edit") {
      return "Edit Post";
    } else {
      return "Post Detail";
    }
  }
};

/**
 * Convert Base64 to Blob
 */
export const base64ToBlob = (base64String: string, contentType = "") => {
  const splitted = base64String.split(",");

  const byteCharacters =
    splitted.length > 1 ? atob(splitted[1]) : atob(base64String);
  const byteArrays = [];

  for (let i = 0; i < byteCharacters.length; i++) {
    byteArrays.push(byteCharacters.charCodeAt(i));
  }

  const byteArray = new Uint8Array(byteArrays);
  return new Blob([byteArray], { type: contentType });

  // https://stackoverflow.com/questions/27980612/converting-base64-to-blob-in-javascript
};

/**
 * Convert Blob to Base64
 */
export const blobToBase64 = async (blob: Blob | File) => {
  let buffer = Buffer.from(await blob.arrayBuffer());
  return "data:" + blob.type + ";base64," + buffer.toString("base64");
};

/**
 * Convert Blob to Binary
 */
export const blobToBinary = async (blob: Blob | File) => {
  const buffer = Buffer.from(await blob.arrayBuffer());
  const base64 = buffer.toString("base64");

  return Buffer.from(base64, "base64");
};

/**
 * Convert buffer to blob
 * @param buffer - Buffer array
 * @param type - Media type
 * @returns - Base64 encoded string
 */
export const bufferToBlob = (buffer: Buffer, type: string = "image/jpg") => {
  return new Blob([buffer], { type: type });
};

/**
 * Conver blob to readable stream
 * @param blob - Blob object
 * @returns - Readable stream object
 */
export const blodToReadable = async (blob: Blob | File) => {
  const buffer = Buffer.from(await blob.arrayBuffer());
  const readable = Readable.from(buffer);

  return readable;
};
