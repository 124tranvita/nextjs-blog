const dictionaries = {
  en: () =>
    import("@/app/common/dictionaries/en.json").then(
      (module) => module.default
    ),
  vi: () =>
    import("@/app/common/dictionaries/vi.json").then(
      (module) => module.default
    ),
};

export const getDictionary = async (locale: string) =>
  dictionaries[locale as keyof typeof dictionaries]();
