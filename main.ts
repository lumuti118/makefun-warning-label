// make.fun entry: Warning Label for Humans — One Line, Big Laugh
// Writes a single-line safety warning label for human beings
// (max 160 characters) to /output/entry.txt.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const LABEL =
  "WARNING: This human's brain has 47 tabs open, 46 of them frozen, and one playing music nobody can find. Do not close any.";

const outPath = process.env.OUTPUT_PATH ?? "/output/entry.txt";

// Gate check (mirrors the house gate in the kit): the entry must be
// UTF-8 text of 1 to 160 characters, not only whitespace, on one line.
// Fail loudly instead of writing an entry the judge would refuse.
if (LABEL.length < 1 || LABEL.length > 160) {
  throw new Error(`Label is ${LABEL.length} characters; gate requires 1-160.`);
}
if (LABEL.trim().length === 0) {
  throw new Error("Label is only whitespace; gate requires real text.");
}
if (LABEL.includes("\n") || LABEL.includes("\r")) {
  throw new Error("Label must be a single line.");
}

mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, LABEL, "utf8");
console.log(`Wrote ${LABEL.length} characters to ${outPath}`);
