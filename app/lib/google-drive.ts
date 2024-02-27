// https://developers.google.com/drive/api/quickstart/nodejs
// https://anonystick.com/blog-developer/huong-dan-upload-file-to-google-drive-voi-nodejs-kem-video-2021101852263830

import { google } from "googleapis";

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI;
const REFRESH_TOKEN = process.env.GOOGLE_REFRESH_TOKEN;
const FOLDER = process.env.GOOGLE_FOLDER;

/** Set OAuth2Client credential */
const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

oauth2Client.setCredentials({
  refresh_token: REFRESH_TOKEN,
  scope: "https://www.googleapis.com/auth/drive.metadata.readonly",
});

/** Create Google drive Apis instance */
const drive = google.drive({ version: "v3", auth: oauth2Client });

/**
 * List file and folder on the drive
 * @returns  - List of file and folder
 */
export async function listFiles() {
  try {
    const res = await drive.files.list({
      pageSize: 10,
      fields: "nextPageToken, files(id, name)",
    });

    const files = res.data.files;
    if (!files || files.length === 0) {
      console.log("No files found.");
      return;
    }

    console.log("Files:");
    files.map((file) => {
      console.log(`${file.name} (${file.id})`);
    });
  } catch (error) {
    console.error({ error });
  }
}

/**
 * Get the specific folder in the drive by given folder name
 * @param folderName - Folder name
 * @returns - Name, Id of the queried folder.
 */
export async function getFolder(folderName: string) {
  try {
    const res = await drive.files.list({
      q: "mimeType='application/vnd.google-apps.folder' and trashed=false",
      pageSize: 10,
      fields: "nextPageToken, files(id, name)",
    });

    const files = res.data.files;
    if (!files || files.length === 0) {
      console.log("No files found.");
      return;
    }

    const folder = files.filter((file) => file.name === folderName);

    return folder ? folder[0] : undefined;
  } catch (error) {
    console.error({ error });
  }
}

/**
 * Upload file to the drive
 * @param name - File name
 * @param type - File type
 * @param data - Media data
 * @returns - Uploaded file's id
 */
export async function fileUpload(name: string, type: string, data: any) {
  const filename = `${name}.${type.split("/")[1]}`;

  const requestBody = {
    name: filename,
    fields: "id",
  };
  const media = {
    mimeType: type,
    body: data,
  };
  try {
    const storeFolder = await getFolder(FOLDER || "nextjs-blog");

    const file = await drive.files.create({
      requestBody: {
        ...requestBody,
        parents: storeFolder && storeFolder.id ? [storeFolder.id] : null,
      },
      media: media,
    });

    return file.data.id;
  } catch (error) {
    console.error({ error });
  }
}

/**
 * Downloads a file
 * @param realFileId - file id
 * @return - Downloaded file as `ArrayBuffer`
 * */
export async function downloadFile(realFileId: string) {
  const fileId = realFileId;

  try {
    const file = await drive.files.get(
      {
        fileId: fileId,
        alt: "media",
      },
      {
        responseType: "arraybuffer",
      }
    );

    return file;
  } catch (error) {
    console.error({ error });
  }
}
