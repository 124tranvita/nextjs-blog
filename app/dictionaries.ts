const dictionaries = {
  en: () => import("../dictionaries/en.json").then((module) => module.default),
  vi: () => import("../dictionaries/vi.json").then((module) => module.default),
};

export const getDictionary = async (locale: string) =>
  dictionaries[locale as keyof typeof dictionaries]();