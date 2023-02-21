import fxp from "fast-xml-parser";
import fs from "fs";
import { join } from "path";

const rawXml = fs.readFileSync(join(__dirname, "/kanjidic2.xml"), {
  encoding: "utf-8",
});
const options: Partial<fxp.X2jOptions> = {
  ignoreAttributes: false,
  attributeNamePrefix: "@_",
};
const parsedXml = new fxp.XMLParser(options).parse(rawXml);

fs.writeFileSync(join(__dirname, "/json.json"), JSON.stringify(parsedXml), {
  encoding: "utf-8",
});
