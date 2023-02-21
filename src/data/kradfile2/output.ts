import Encoding from "encoding-japanese";
import fs from "fs";
import { join } from "path";
import { Kradfile2Output } from "./output.d";

const kradfile2Buffer = fs.readFileSync(join(__dirname, "kradfile2"));
const detectedEncoding = Encoding.detect(kradfile2Buffer);

const kradfile2Unicode = Encoding.convert(kradfile2Buffer, {
  from: "EUCJP",
  to: "UNICODE",
});
const kradfile2 = Encoding.codeToString(kradfile2Unicode);

const lines = kradfile2.split("\n").filter(line => !line.startsWith("#"));

const output: Kradfile2Output = {};

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
