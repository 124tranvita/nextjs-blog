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

/**
 *
 * @param value
 * @returns
 */
export const isValidUrl = (value: string) => {
  const regx =
    /^(ftp|http|https):\/\/[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%._+~#?&//=]*)$/;

  return regx.test(value);
};

/**
 * Strip out HTML tags from the string
 * @param value - String with html tags
 * @returns - String already stripped out html tags
 */
export const stripHtmlTags = (value: string) => {
  if (!value || typeof document === "undefined") return "";

  const div = document.createElement("div");
  div.innerHTML = value;

  return div.textContent || div.innerText || "";
};
