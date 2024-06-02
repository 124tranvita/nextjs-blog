export type Post = {
  _id: string;
  title: string;
  cloudImg: string;
  localImg: string;
  content: string;
  author: string;
  createdAt: string | Date;
  updatedAt: string | Date;
  user: string;
};

export type User = {
  _id: string;
  email: string;
  name: string;
  createdAt: string | Date;
};

export type CurrentUser = {
  token: string;
  data: {
    user: User;
  };
};

export type PostPreview = {
  title: string;
  cloudImg: string;
  localImg: string;
  content: string;
};

export const initPost: Post = {
  _id: "",
  title: "",
  cloudImg: "",
  localImg: "",
  content: "",
  author: "Anonymous",
  createdAt: new Date(),
  updatedAt: new Date(),
  user: "Anonymous",
};

export const initPostPreview: PostPreview = {
  title: "",
  cloudImg: "",
  localImg: "",
  content: "",
};
