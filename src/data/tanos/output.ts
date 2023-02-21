import { tanosVocabDictionary as n1Vocab } from "./n1/vocab";
import { tanosVocabDictionary as n2Vocab } from "./n2/vocab";
import { tanosVocabDictionary as n3Vocab } from "./n3/vocab";
import { tanosVocabDictionary as n4Vocab } from "./n4/vocab";
import { tanosVocabDictionary as n5Vocab } from "./n5/vocab";
import { TanosOutput } from "./output.d";
import { TanosVocabDictionary } from "./types/tanosVocabDictionary";

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
