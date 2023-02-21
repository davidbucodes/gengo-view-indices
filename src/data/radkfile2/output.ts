import Encoding from "encoding-japanese";
import fs from "fs";
import { join } from "path";
import { Radkfile2Output } from "./output.d";

const radkfile2Buffer = fs.readFileSync(join(__dirname, "radkfile2"));
const detectedEncoding = Encoding.detect(radkfile2Buffer);

const radkfile2Unicode = Encoding.convert(radkfile2Buffer, {
  from: "EUCJP",
  to: "UNICODE",
});
const radkfile2 = Encoding.codeToString(radkfile2Unicode);

const lines = radkfile2.split("\n").filter(line => !line.startsWith("#"));

const output: Radkfile2Output = {};

let currKanji: string = "";
let associatedKanjis: string[] = [];

for (const line of lines) {
  if (line.startsWith("$")) {
    if (currKanji) {
      output[currKanji] = associatedKanjis;
      currKanji = "";
      associatedKanjis = [];
    }
    const [dollar, kanji, radicals, jisCode] = line.split(" ");

    currKanji = kanji;
  } else {
    associatedKanjis.push(...line.split(""));
  }
}

fs.writeFileSync(join(__dirname, "/output.json"), JSON.stringify(output), {
  encoding: "utf8",
});
