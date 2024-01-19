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
