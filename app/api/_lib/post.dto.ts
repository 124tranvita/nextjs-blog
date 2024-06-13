import { ObjectId } from "mongoose";

interface BasePostDto {
  title: string;
  localImg: string | null | undefined;
  cloudImg: string | null | undefined;
  content: string;
  author: ObjectId;
}

export interface CreatePostDto extends BasePostDto {}
export interface UpdatePostDto extends Partial<BasePostDto> {}
