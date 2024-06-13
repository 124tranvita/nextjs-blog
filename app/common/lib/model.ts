export type Post = {
  _id: string;
  title: string;
  cloudImg: string;
  localImg: string;
  content: string;
  createdAt: string | Date;
  updatedAt: string | Date;
  author: Omit<Author, "createdAt">;
};

export type Author = {
  _id: string;
  email: string;
  name: string;
  createdAt: string | Date;
};

export type CurrentUser = {
  token: string;
  data: {
    user: Author;
  };
};

export type PostPreview = {
  title: string;
  cloudImg: string;
  localImg: string;
  content: string;
};

export const initAuthor: Author = {
  _id: "",
  email: "",
  name: "",
  createdAt: "",
};

export const initPost: Post = {
  _id: "",
  title: "",
  cloudImg: "",
  localImg: "",
  content: "",
  createdAt: new Date(),
  updatedAt: new Date(),
  author: initAuthor,
};

export const initPostPreview: PostPreview = {
  title: "",
  cloudImg: "",
  localImg: "",
  content: "",
};
