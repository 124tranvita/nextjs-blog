import Post from "../models/post";
import { CreatePostDto, UpdatePostDto } from "../post.dto";

/**
 * Find posts
 * @param page - Page
 * @param limit - Limit
 * @returns - List of posts
 */
export const find = async (page: number, limit: number) => {
  const skip = (page - 1) * limit;
  return await Post.find()
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 })
    .sort({ updatedAt: -1 })
    .exec();
};

/**
 * Get post
 * @param id - Post'id
 * @returns - Single post
 */
export const findById = async (id: string) => {
  return await Post.findById(id).exec();
};

/**
 * Create a new post
 * @param createPostDto - CreatePostDto
 * @returns - `Promise` New post
 */
export const create = async (createPostDto: CreatePostDto) => {
  return await Post.create({
    ...createPostDto,
    createdAt: new Date(),
  });
};

/**
 * Update post
 * @param id - Post's id
 * @param updatePostDto - UpdatePostDto
 * @returns - `Pormise` Updated post
 */
export const findByIdAndUpdate = async (
  id: string,
  updatePostDto: UpdatePostDto
) => {
  return await Post.findByIdAndUpdate(id, {
    ...updatePostDto,
    updatedAt: new Date(),
  }).exec();
};

/**
 * Delete query post
 * @param id - Post's id
 * @returns - `Promise` Deleted post
 */
export const findByIdAndDelete = async (id: string) => {
  return await Post.findByIdAndDelete(id).exec();
};

/**
 * Query post by give condition
 * @param options - Condition
 * @returns - Queried post by give condition
 */
export const findByCondition = async (options: object) => {
  return await Post.find({ ...options }).exec();
};

/**
 * Query posts by search term
 * @param searchTerm - Search term
 * @param page - Page number
 * @param limit - Limit number
 * @returns - Queried posts by search term
 */
export const searchPosts = async (
  searchTerm: string,
  page: number,
  limit: number
) => {
  console.log({ searchTerm, page, limit });
  const skip = (page - 1) * limit;
  return await Post.aggregate([
    {
      $search: {
        index: "search_posts",
        text: {
          query: `${searchTerm}`,
          path: {
            wildcard: "*",
          },
        },
      },
    },
  ])
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 })
    .sort({ updatedAt: -1 });
};
