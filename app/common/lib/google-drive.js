"use server";
// https://developers.google.com/drive/api/quickstart/nodejs
// https://anonystick.com/blog-developer/huong-dan-upload-file-to-google-drive-voi-nodejs-kem-video-2021101852263830

import { google } from "googleapis";
import * as Utils from "./utils";

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI;
const REFRESH_TOKEN = process.env.GOOGLE_REFRESH_TOKEN;
const FOLDER = process.env.GOOGLE_FOLDER;
const NODE_ENV = process.env.NODE_ENV;

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
 * Get the specific folder in the drive by given folder name
 * @param {string} folderName - Folder name
 * @returns - Name, Id of the queried folder.
 */
export async function getFolder(folderName) {
  try {
    if (!folderName) return undefined;

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
 * @param {string} name - File name
 * @param {string} type - File type
 * @param {*} data - Media data
 * @returns - Uploaded file's id
 */
export async function fileUpload(name, type, data) {
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
    const storeFolder = await getFolder(
      NODE_ENV && NODE_ENV === "production" ? FOLDER : "nextjs-blog-dev"
    );

    const file = await drive.files.create({
      requestBody: {
        ...requestBody,
        parents: storeFolder && storeFolder.id ? [storeFolder.id] : null,
      },
      media: media,
    });

    if (file.status !== 200) {
      console.error({ file });
    }

    const fileId = file.data.id;

    drive.permissions.create({
      fileId,
      requestBody: {
        role: "reader",
        type: "anyone",
      },
    });

    return file.data.id;
  } catch (error) {
    console.error({ error });
  }
}

/**
 * Delete a file
 * @param {string} realFileId - file id
 * @return - Downloaded file as `ArrayBuffer`
 * */
export async function deleteFile(fileId) {
  try {
    const file = await drive.files.delete({
      fileId: fileId,
      fields: "files(id, name)",
    });

    return file.status;
  } catch (error) {
    console.error({ error });
  }
}

/** NOT USE IN CODE */

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

    files.map((file) => {
      console.log(`${file.name} (${file.id})`);
    });
  } catch (error) {
    console.error({ error });
  }
}

/**
 * Get web link of file in google drive
 * @param {string} realFileId - file id
 * @return - Web link url
 * */
export async function getFileLink(realFileId) {
  const fileId = realFileId;

  try {
    await drive.permissions.create({
      fileId,
      requestBody: {
        role: "reader",
        type: "anyone",
      },
    });

    const res = await drive.files.get({
      fileId: fileId,
      fields: "webViewLink, webContentLink",
    });

    const webContentLink = res.data.webContentLink;
    const viewLink = webContentLink.replace("download", "view");

    return viewLink;
  } catch (error) {
    console.error({ error });
  }
  //https://stackoverflow.com/questions/72864657/hosting-pictures-with-react-and-google-drive
}

/**
 * Downloads a file
 * @param {string} realFileId - file id
 * @return - Downloaded file as `ArrayBuffer`
 * */
export async function downloadFile(realFileId) {
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

    const blob = Utils.bufferToBlob(file.data, file.headers?.["content-type"]);

    return {
      base64: await Utils.blobToBase64(blob),
      type: file.headers?.["content-type"],
    };
  } catch (error) {
    console.error({ error });
  }
}

/** ------------------ 
 * create file response
 * {
  file: {
    config: {
      url: 'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart',
      method: 'POST',
      userAgentDirectives: [Array],
      paramsSerializer: [Function (anonymous)],
      data: [PassThrough],
      headers: [Object],
      params: [Object],
      validateStatus: [Function (anonymous)],
      retry: true,
      body: [PassThrough],
      responseType: 'json'
    },
    data: {
      kind: 'drive#file',
      id: '1gvLgdLr3GQ3ASfbalAiQrVVE8vuaUXm3',
      name: 'Người ta dễ buồn vì những điều đã cũ.jpeg',
      mimeType: 'image/jpeg'
    },
    headers: {
      'access-control-allow-credentials': 'true',
      'alt-svc': 'h3=":443"; ma=2592000,h3-29=":443"; ma=2592000',
      'cache-control': 'no-cache, no-store, max-age=0, must-revalidate',
      'content-length': '171',
      'content-type': 'application/json; charset=UTF-8',
      date: 'Sun, 21 Apr 2024 15:56:00 GMT',
      expires: 'Mon, 01 Jan 1990 00:00:00 GMT',
      pragma: 'no-cache',
      server: 'ESF',
      vary: 'Origin, X-Origin',
      'x-content-type-options': 'nosniff',
      'x-frame-options': 'SAMEORIGIN',
      'x-guploader-uploadid': 'ABPtcPqcjmeW1Im_sdEC12WGkbVMSiUxqpXQc6Tc0lIgNa9sArFkfR6lN_iVPWncoGya1mV-mTWEbKvFrw',
      'x-xss-protection': '0'
    },
    status: 200,
    statusText: 'OK',
    request: {
      responseURL: 'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart'
    }
  }
}
*/
