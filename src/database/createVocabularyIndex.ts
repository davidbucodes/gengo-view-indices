import { Index, VocabularyDocument } from "@davidbucodes/gengo-view-database";
import * as fs from "fs";
import { output as jmdictOutput } from "../data/jmdict_e";
import { output as tanosOutput } from "../data/tanos/output";

export const index = new Index<VocabularyDocument>({
  name: "vocabulary",
  searchableJapaneseTextFields: ["display", "reading"],
  searchableEnglishTextFields: ["meaning", "expl"],
});

const docs = jmdictOutput.items.map(
  item =>
    ({
      ...item,
      ...(item.display.some(word => tanosOutput[word])
        ? { jlpt: tanosOutput[item.display.find(word => tanosOutput[word])] }
        : {}),
    } satisfies VocabularyDocument)
);

index.addDocuments(docs);

const result = index.searchText("おなじ");

const stringified = index.export();
if (!fs.existsSync("./dist")) {
  fs.mkdirSync("./dist");
}

fs.writeFileSync("./dist/vocabulary.index.json", stringified, {
  encoding: "utf-8",
});
