import fs from "fs";
import { join } from "path";
import { Entry, Gloss, JMdictXML } from "./json.d";
import { DictData, JMdictOutput } from "./output.d";

const jmdict: JMdictXML = require("./json.json");

const results: JMdictOutput = jmdict.JMdict.entry.reduce(
  (acc, entry) => {
    const terms: string[] = extractSearchTerms(entry);
    const item: DictData = extractItem(entry);
    const itemIndex = acc.items.length;

    terms.forEach(term => {
      const currEntry = acc.terms[term];
      if (typeof currEntry === "number") {
        acc.terms[term] = [currEntry, itemIndex];
      } else if (Array.isArray(currEntry)) {
        currEntry.push(itemIndex);
      } else {
        acc.terms[term] = itemIndex;
      }
    });

    acc.items.push(item);

    return acc;
  },
  { terms: {}, items: [] } as JMdictOutput
);

fs.writeFileSync(join(__dirname, "/output.json"), JSON.stringify(results), {
  encoding: "utf-8",
});

function extractSearchTerms(entry: Entry): string[] {
  const kTerms = entry.k_ele
    ?.map(ele => ele?.keb)
    .flat()
    .filter(e => e);
  const rTerms = entry.r_ele
    .map(ele => ele?.reb)
    .flat()
    .filter(e => e);

  return [...(kTerms || []), ...rTerms];
}

function extractItem(entry: Entry): DictData {
  const kTerms = entry.k_ele
    ?.map(ele => ele?.keb)
    .flat()
    .filter(e => e);
  const rTerms = entry.r_ele
    .map(ele => ele?.reb)
    .flat()
    .filter(e => e);

  const display: string[] = kTerms?.length ? kTerms : rTerms;

  const expl = entry.sense
    .map(ele => ele?.gloss)
    .flat()
    .flat()
    .filter(gloss => {
      if (typeof gloss === "object" && gloss.$.g_type === "expl") {
        return gloss._;
      }
    })
    .map(gloss => {
      return (gloss as Gloss)._;
    });

  const meaning = entry.sense
    .map(ele => ele?.gloss)
    .flat()
    .flat()
    .filter(gloss => {
      if (typeof gloss === "string") {
        return true;
      }
    }) as string[];

  return {
    display,
    expl,
    meaning,
    reading: rTerms,
  };
}
