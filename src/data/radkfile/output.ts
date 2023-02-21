import Encoding from "encoding-japanese";
import fs from "fs";
import { join } from "path";
import { RadkfileOutput } from "./output.d";

const radkfileBuffer = fs.readFileSync(join(__dirname, "radkfile"));
const detectedEncoding = Encoding.detect(radkfileBuffer);

const radkfileUnicode = Encoding.convert(radkfileBuffer, {
  from: "EUCJP",
  to: "UNICODE",
});
const radkfile = Encoding.codeToString(radkfileUnicode);

const lines = radkfile.split("\n").filter(line => !line.startsWith("#"));

const output: RadkfileOutput = {};

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
