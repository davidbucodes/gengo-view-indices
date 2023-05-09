import { Index, KanjiDocument } from "@davidbucodes/gengo-view-database";
import * as fs from "fs";
import { output as kanjidic2Output } from "../data/kanjidic2";
import { output as kradfileOutput } from "../data/kradfile";
import { output as kradfile2Output } from "../data/kradfile2";
import { output as radkfileOutput } from "../data/radkfile";
import { output as radkfile2Output } from "../data/radkfile2";

export const index = new Index<KanjiDocument>({
  name: "kanji",
  searchableJapaneseTextFields: ["kanji", "kunReading", "onReading"],
  searchableEnglishTextFields: ["meaning"],
});

const docs = Object.entries(kanjidic2Output).map(
  ([
    kanji,
    { freq, grade, jlpt, strokeCount, onReading, kunReading, meaning, nanori },
  ]) => {
    const appearsAtKanji = radkfileOutput[kanji] || radkfile2Output[kanji];
    const radicals = kradfileOutput[kanji] || kradfile2Output[kanji];
    return {
      kanji,
      freq,
      grade,
      jlpt,
      strokeCount,
      onReading: onReading.sort((a, b) => a.length - b.length),
      kunReading: kunReading.sort((a, b) => a.length - b.length),
      meaning,
      nanori: nanori.filter(n => n),
      appearsAtKanji,
      radicals,
    } satisfies KanjiDocument;
  }
);

index.addDocuments(docs);

const result = index.searchText("おなじ");

const stringified = index.export();
if (!fs.existsSync("./dist")) {
  fs.mkdirSync("./dist");
}

fs.writeFileSync("./dist/kanji.index.json", stringified, {
  encoding: "utf-8",
});
