import Encoding from "encoding-japanese";
import fs from "fs";
import { join } from "path";
import { KradfileOutput } from "./output.d";

const kradfileBuffer = fs.readFileSync(join(__dirname, "kradfile"));
const detectedEncoding = Encoding.detect(kradfileBuffer);

const kradfileUnicode = Encoding.convert(kradfileBuffer, {
  from: "EUCJP",
  to: "UNICODE",
});
const kradfile = Encoding.codeToString(kradfileUnicode);

const lines = kradfile.split("\n").filter(line => !line.startsWith("#"));

const output: KradfileOutput = {};

lines.reduce((acc, currLine) => {
  const [kanji, radicals] = currLine.split(" : ");
  if (kanji && radicals) {
    acc[kanji] = radicals.split(" ").map(rad => rad);
  }
  return acc;
}, output);

fs.writeFileSync(join(__dirname, "/output.json"), JSON.stringify(output), {
  encoding: "utf8",
});
