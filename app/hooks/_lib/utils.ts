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
