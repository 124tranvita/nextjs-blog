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
