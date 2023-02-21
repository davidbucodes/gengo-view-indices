import fs from "fs";
import { join } from "path";
import { SentenceOutput } from "./output.d";

const sentencesTsv = fs.readFileSync(join(__dirname, "ck_used_sentences.tsv"), {
  encoding: "utf8",
});

const lines = sentencesTsv.split("\r\n").filter(line => line);

const output: SentenceOutput = [];

for (const line of lines) {
  const [_id, e, j] = line.split("	");
  output.push({ e, j });
}

fs.writeFileSync(join(__dirname, "/output.json"), JSON.stringify(output), {
  encoding: "utf8",
});
