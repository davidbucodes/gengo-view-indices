import fs from "fs";
import { join } from "path";
import { Kanjidic2XML } from "./json.d";
import { Kanjidic2Output } from "./output.d";

const kanjidic2: Kanjidic2XML = require("./json.json");

const results: Kanjidic2Output = kanjidic2.kanjidic2.character.reduce(
  (acc, character) => {
    const { misc, reading_meaning, literal } = character;
    const { freq, grade, jlpt, stroke_count: strokeCount } = misc || {};
    const { rmgroup, nanori } = reading_meaning || {};
    const { reading: readingRaw, meaning: meaningRaw } = rmgroup || {};

    let readingArray = readingRaw;
    if (!Array.isArray(readingArray)) {
      readingArray = [readingArray];
    }
    const on = readingArray
      .filter(reading => reading?.["@_r_type"] === "ja_on")
      .map(reading => reading?.["#text"]);
    const kun = readingArray
      .filter(reading => reading?.["@_r_type"] === "ja_kun")
      .map(reading => reading?.["#text"]);
    const pinyin = readingArray
      .filter(reading => reading?.["@_r_type"] === "pinyin")
      .map(reading => reading?.["#text"]);

    let meaning: string[] = [];
    if (typeof meaningRaw === "string") {
      meaning = [meaningRaw];
    } else if (
      typeof meaningRaw === "number" ||
      typeof meaningRaw === "boolean"
    ) {
      meaning = [String(meaningRaw)];
    } else {
      meaning = meaningRaw
        ?.map(meaning => {
          if (typeof meaning === "string") {
            return meaning;
          } else if (
            typeof meaning === "number" ||
            typeof meaning === "boolean"
          ) {
            return String(meaning);
          }
        })
        .filter(value => value);
    }

    acc[literal] = {
      freq,
      grade,
      jlpt,
      strokeCount: Array.isArray(strokeCount) ? strokeCount : [strokeCount],
      on,
      kun,
      pinyin,
      meaning,
      nanori: Array.isArray(nanori) ? nanori : [nanori],
    };

    return acc;
  },
  {} as Kanjidic2Output
);

fs.writeFileSync(join(__dirname, "/output.json"), JSON.stringify(results), {
  encoding: "utf-8",
});
