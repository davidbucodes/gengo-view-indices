import { Index, SentenceDocument } from "@gengo-view/database";
import * as fs from "fs";
import { output } from "../data/tatoeba";

export const index = new Index<SentenceDocument>({
  name: "sentence",
  searchableJapaneseTextFields: ["j"],
  searchableEnglishTextFields: ["e"],
});

const docs = output;

index.addDocuments(docs);
const result = index.searchText("おなじ");

const stringified = index.export();
if (!fs.existsSync("./dist")) {
  fs.mkdirSync("./dist");
}

fs.writeFileSync("./dist/sentence.index.json", stringified, {
  encoding: "utf-8",
});
