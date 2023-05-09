import { Index, NameDocument } from "@davidbucodes/gengo-view-database";
import * as fs from "fs";
import { output } from "../data/jmnedict";

export const index = new Index<NameDocument>({
  name: "name",
  searchableJapaneseTextFields: ["n", "r"],
  searchableEnglishTextFields: ["d"],
});

const docs = Object.entries(output).map(
  ([n, info]) =>
    ({
      n,
      d: info.d,
      t: info.t,
      r: info.r?.split("|").sort((a, b) => a.length - b.length),
    } satisfies NameDocument)
);

index.addDocuments(docs);

const result = index.searchText("ちゅせん");

const stringified = index.export();
if (!fs.existsSync("./dist")) {
  fs.mkdirSync("./dist");
}

fs.writeFileSync("./dist/name.index.json", stringified, {
  encoding: "utf-8",
});
