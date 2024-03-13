export const i18n = {
  locales: ["en", "vi"],
  defaultLocale: "vi",
  pages: {
    "*": ["common"],
    "/[slug]": ["home"],
  },
} as const;

export type Locale = (typeof i18n)["locales"][number];
