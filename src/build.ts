import * as fs from "fs";

(async function () {
  await Promise.all([
    new Promise(async res => {
      await import("./database/createKanjiIndex");
      console.log("Completed creating kanji index");
      return res(true);
    }),
    new Promise(async res => {
      await import("./database/createNameIndex");
      console.log("Completed creating name index");
      return res(true);
    }),
    new Promise(async res => {
      await import("./database/createVocabularyIndex");
      console.log("Completed creating vocabulary index");
      return res(true);
    }),
    new Promise(async res => {
      await import("./database/createSentenceIndex");
      console.log("Completed creating sentence index");
      return res(true);
    }),
  ]);

  fs.copyFileSync("./package.json", "./dist/package.json");
})();
