import fs from "fs";
import { join } from "path";
import { Parser } from "xml2js";
const jsonToTS = require("json-to-ts");

newFunction();
async function newFunction() {
  const rawXml = fs.readFileSync(join(__dirname, "./JMDict_e.xml"), {
    encoding: "utf-8",
  });

  // const parsedXml = new fxp.XMLParser(options).parse(rawXml);
  const parsedXml: string = await new Parser().parseStringPromise(
    rawXml.replace(/&(?!(?:apos|quot|[gl]t|amp);|#)/g, "&amp;")
  );

  fs.writeFileSync(join(__dirname, "/json.json"), JSON.stringify(parsedXml), {
    encoding: "utf-8",
  });

  const types: string[] = jsonToTS(parsedXml);

  fs.writeFileSync(join(__dirname, `/json.d.ts`), types.join("\n"), {
    encoding: "utf-8",
  });
}
