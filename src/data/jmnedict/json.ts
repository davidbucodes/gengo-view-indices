import fs from "fs";
import { join } from "path";
import { Parser } from "xml2js";
import { commonLettersRegexp } from "../../regexp/commonLettersRegexp";
import type { RootObject } from "./json.d";
const jsonToTS = require("json-to-ts");

newFunction();
async function newFunction() {
  const rawXml = fs.readFileSync(join(__dirname, "./JMnedict.xml"), {
    encoding: "utf-8",
  });

  const parsedXml: RootObject = await new Parser().parseStringPromise(
    rawXml.replace(/&(?!(?:apos|quot|[gl]t|amp);|#)/g, "&amp;")
  );

  parsedXml.JMnedict.entry = parsedXml.JMnedict.entry.filter(entry => {
    if (
      !entry?.k_ele ||
      entry?.k_ele?.every(ele =>
        ele?.keb?.every(keb => commonLettersRegexp.test(keb))
      )
    ) {
      return false;
    }
    return true;
  });

  parsedXml.JMnedict.entry = parsedXml.JMnedict.entry.filter(entry => {
    if (
      !entry?.k_ele ||
      entry?.k_ele?.every(ele =>
        ele?.keb?.every(keb => commonLettersRegexp.test(keb))
      )
    ) {
      return false;
    }
    return true;
  });

  fs.writeFileSync(join(__dirname, "/json.json"), JSON.stringify(parsedXml), {
    encoding: "utf-8",
  });
}
