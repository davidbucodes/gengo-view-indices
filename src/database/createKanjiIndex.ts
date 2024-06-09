import { Index, KanjiDocument } from "@davidbucodes/gengo-view-database";
import * as fs from "fs";
import { output as kanjidic2Output } from "../data/kanjidic2";
import { output as kradfileOutput } from "../data/kradfile";
import { output as kradfile2Output } from "../data/kradfile2";
import { output as radkfileOutput } from "../data/radkfile";
import { output as radkfile2Output } from "../data/radkfile2";
import { kanjiToJlpt } from "../data/tanos/output";

export const index = new Index<KanjiDocument>({
  name: "kanji",
  searchableJapaneseTextFields: ["kanji", "kunS", "on"],
  searchableEnglishTextFields: ["meaning"],
});

const docs = Object.entries(kanjidic2Output).map(
  ([
    kanji,
    { freq, grade, jlpt, strokeCount, on, kun, pinyin, meaning, nanori },
  ]) => {
    const appearsAtKanji = radkfileOutput[kanji] || radkfile2Output[kanji];
    const radicals = kradfileOutput[kanji] || kradfile2Output[kanji];
    const kunSorted = kun.sort((a, b) => a.length - b.length);
    return {
      kanji,
      freq,
      grade,
      jlpt: Number(kanjiToJlpt[kanji] || jlpt),
      strokeCount,
      on: on.sort((a, b) => a.length - b.length),
      kun: kunSorted,
      kunS: kunSorted.map(k => k.replace(/[-\.]/g, "")),
      pinyin: pinyin.sort((a, b) => a.length - b.length),
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
