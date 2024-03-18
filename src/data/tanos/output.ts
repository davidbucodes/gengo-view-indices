import { JlptLevel } from "@davidbucodes/gengo-view-database";
import { tanosVocabDictionary as n1Vocab } from "./n1/vocab";
import { tanosVocabDictionary as n2Vocab } from "./n2/vocab";
import { tanosVocabDictionary as n3Vocab } from "./n3/vocab";
import { tanosVocabDictionary as n4Vocab } from "./n4/vocab";
import { tanosVocabDictionary as n5Vocab } from "./n5/vocab";
import { tanosKanjiDictionary as n1Kanji } from "./n1/kanji";
import { tanosKanjiDictionary as n2Kanji } from "./n2/kanji";
import { tanosKanjiDictionary as n3Kanji } from "./n3/kanji";
import { tanosKanjiDictionary as n4Kanji } from "./n4/kanji";
import { tanosKanjiDictionary as n5Kanji } from "./n5/kanji";
import { TanosOutput } from "./output.d";
import { TanosVocabDictionary } from "./types/tanosVocabDictionary";
import { TanosKanjiDictionary } from "./types/tanosKanjiDictionary";

export const output: TanosOutput = {};

(
  [
    [n1Vocab, 1],
    [n2Vocab, 2],
    [n3Vocab, 3],
    [n4Vocab, 4],
    [n5Vocab, 5],
  ] as [TanosVocabDictionary, 1 | 2 | 3 | 4 | 5][]
).forEach(([dict, index]) => {
  Object.keys(dict).forEach(word => (output[word] = index));
});

export const kanjiToJlpt: Record<string, JlptLevel> = {};

const kanjiToJlptTuples: [TanosKanjiDictionary, JlptLevel][] = [
  [n1Kanji, "1"],
  [n2Kanji, "2"],
  [n3Kanji, "3"],
  [n4Kanji, "4"],
  [n5Kanji, "5"],
];

kanjiToJlptTuples.forEach(([dict, index]) => {
  Object.keys(dict).forEach(word => (kanjiToJlpt[word] = index));
});

console.log(kanjiToJlpt);
