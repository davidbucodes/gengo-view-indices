import fs from "fs";
import { join } from "path";
import { Parser } from "xml2js";
const jsonToTS = require("json-to-ts");

newFunction();
async function newFunction() {
  const rawXml = fs.readFileSync(join(__dirname, "./JMnedict.xml"), {
    encoding: "utf-8",
  });

  const parsedXml: string = await new Parser().parseStringPromise(
    rawXml.replace(/&(?!(?:apos|quot|[gl]t|amp);|#)/g, "&amp;")
  );

  const types: string[] = jsonToTS(parsedXml);

  fs.writeFileSync(join(__dirname, `/json.d.ts`), types.join("\n"), {
    encoding: "utf-8",
  });
}
