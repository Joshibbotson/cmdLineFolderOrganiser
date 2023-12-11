import fs from "fs";
import os from "os";
import { ReadLine } from "readline";

const readLine = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
});

readLine.question("Who are you?", (name: string) => {
    console.log("Hello there " + name);
    readLine.close;
});
function getPath(targetFolder: string) {
    const user = os.userInfo().username;
    return `/Users/${user}/${targetFolder}`;
}

function recFolderCheck(
    currPath: string,
    targetFileArr: string,
    targetFolder: string
) {
    const path = currPath
        ? `${getPath("downloads")}/${currPath}`
        : `${getPath("downloads")}`;

    fs.readdir(path, (err, files) => {
        if (!files) {
            return;
        }

        files.forEach(file => {
            if (targetFileArr.includes(file.toLowerCase())) {
                const oldPath = `${path}/${file}`;
                const newPath = `${getPath(
                    "downloads"
                )}/${targetFolder}/${file}`;

                fs.rename(oldPath, newPath, err => {
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
                recFolderCheck(
                    `${currPath}/${folder}`,
                    targetFileArr,
                    targetFolder
                );
            } else if (!currPath) {
                recFolderCheck(`${folder}`, targetFileArr, targetFolder);
            }
        });
    });
}
