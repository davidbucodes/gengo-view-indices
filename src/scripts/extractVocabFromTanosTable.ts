// save the TBODY tag as global variable, then:

import { TanosVocabDictionary } from "../data/tanos/types/tanosVocabDictionary";

const tbody = document.getElementsByTagName("tbody")[1];

const vocabDictionary = [...tbody.children].slice(1).reduce((reducer, row) => {
  const children = [...row.children].map(
    cell => (cell?.children[0] as HTMLLinkElement)?.innerText
  );
  const vocab = children[0];
  const hiragana = children[1]?.trim();
  const key = vocab || hiragana;

  reducer[key] = {
    hiragana,
    eng: children[2]?.split(",")?.map(eng => eng.trim()),
  };
  return reducer;
}, {} as TanosVocabDictionary);

// @ts-ignore
copy(vocabDictionary); // now the kanji dictionary JSON is available to paste at the clipboard
