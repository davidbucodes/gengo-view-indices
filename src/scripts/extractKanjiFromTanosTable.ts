// save the TBODY tag as global variable, then:

import { TanosKanjiDictionary } from "../data/tanos/types/tanosKanjiDictionary";

const tbody = document.getElementsByTagName("tbody")[1];

const kanjiDictionary = [...tbody.children].slice(1).reduce((reducer, row) => {
  const children = [...row.children].map(
    cell => (cell?.children[0] as HTMLLinkElement)?.innerText
  );
  const kanji = children[0];
  reducer[kanji] = {
    on: children[1]?.split(" "),
    kun: children[2]?.split(" "),
    eng: children[3]?.split(", "),
  };
  return reducer;
}, {} as TanosKanjiDictionary);

// @ts-ignore
copy(kanjiDictionary); // now the kanji dictionary JSON is available to paste at the clipboard
