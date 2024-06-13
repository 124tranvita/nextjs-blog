import { fileUpload } from "@/app/common/lib/google-drive";
import { blodToReadable } from "@/app/common/lib/utils";

export const processGoogleFileId = async (
  localImg: Blob | File | string,
  title: string
) => {
  if (typeof localImg === "string" || localImg.size === 0) return "";

  const readable = await blodToReadable(localImg);
  return await fileUpload(title, localImg.type, readable);
};
