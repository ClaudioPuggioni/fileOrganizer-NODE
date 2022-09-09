const { readdir, mkdir, rename } = require("fs/promises");
const { existsSync } = require("fs");
const os = require("os");

let DIR = os.homedir().split("\\");
DIR = `/${DIR.slice(1).join("/")}/Downloads`;

const fileExts = {
  images: ["svg", "jpg", "jpeg", "bmp", "png", "webp", "gif", "eps", "ico"],
  music: ["flac", "mp3", "wav"],
  video: ["mp4", "mov", "avi", "mkv", "mpeg"],
  docs: ["pdf", "doc", "docx", "rtf", "txt", "ppt", "xls", "csv", "epub"],
  exec: ["bat", "exe", "app", "msi", ""],
  misc: ["zip", "iso"],
};
let folders = [];

async function getFiles() {
  try {
    const filesList = await readdir(DIR);
    for await (const file of filesList) {
      if (file.includes(".")) {
        const ext = file.slice(file.lastIndexOf(".") + 1);
        for (const extArr in fileExts) {
          if (fileExts[extArr].includes(ext)) {
            if (!folders.includes(extArr) && !existsSync(`${DIR}/${extArr}`)) {
              await mkdir(`${DIR}/${extArr}`);
              folders.push(extArr);
            }
            await rename(`${DIR}/${file}/`, `${DIR}/${extArr}/${file}`);
          }
        }
      }
    }
  } catch (err) {
    console.log(err);
  }
}

getFiles();
