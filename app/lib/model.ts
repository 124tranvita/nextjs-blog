export type Post = {
  _id: string;
  title: string;
  coverImgFileId: string;
  cover: Buffer | Blob;
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

export const initPostPreview: PostPreview = {
  title: "",
  cover: "",
  content: "",
};
