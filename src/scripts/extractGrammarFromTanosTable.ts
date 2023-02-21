// save the TBODY tag as global variable, then:

import { TanosGrammarList } from "../data/tanos/types/tanosGrammarList";

const tbody = document.getElementsByTagName("tbody")[1];

const grammarList = [...tbody.children].reduce((reducer, row) => {
  const children = [...row.children].map(
    cell => (cell?.children[0] as HTMLLinkElement)?.innerText
  );
  const grammar = children[0];

  reducer.push(grammar);
  return reducer;
}, [] as TanosGrammarList);

// @ts-ignore
copy(grammarList); // now the kanji dictionary JSON is available to paste at the clipboard
