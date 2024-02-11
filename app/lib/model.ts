export type Post = {
  _id: string;
  title: string;
  cover: string;
  content: string;
  author: string;
  createdAt: string | Date;
  updatedAt: string | Date;
};

export type PostPreview = {
  title: string;
  cover: string;
  content: string;
};
