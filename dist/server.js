"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const os_1 = __importDefault(require("os"));
const readLine = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
});
readLine.question("Who are you?", (name) => {
    console.log("Hello there " + name);
    readLine.close;
});
function getPath(targetFolder) {
    const user = os_1.default.userInfo().username;
    return `/Users/${user}/${targetFolder}`;
}
function recFolderCheck(currPath, targetFileArr, targetFolder) {
    const path = currPath
        ? `${getPath("downloads")}/${currPath}`
        : `${getPath("downloads")}`;
    fs_1.default.readdir(path, (err, files) => {
        if (!files) {
            return;
        }
        files.forEach(file => {
            if (targetFileArr.includes(file.toLowerCase())) {
                const oldPath = `${path}/${file}`;
                const newPath = `${getPath("downloads")}/${targetFolder}/${file}`;
                fs_1.default.rename(oldPath, newPath, err => {
                    if (err) {
                        console.log(err);
                    }
                });
                return;
            }
        });
        const folders = files.filter(file => {
            return !file.includes(".");
        });
        folders.forEach(folder => {
            if (currPath) {
                recFolderCheck(`${currPath}/${folder}`, targetFileArr, targetFolder);
            }
            else if (!currPath) {
                recFolderCheck(`${folder}`, targetFileArr, targetFolder);
            }
        });
    });
}
