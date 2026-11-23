// One Letter for Your Day — make.fun entry
// The program writes exactly one letter, "O", to /output/entry.txt.
// Behind the letter sits the word for the day: "overcaffeinated".
// One letter, nothing else: no word, no gloss, no punctuation.

import { mkdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const LETTER = "O";
const OUT_PATH = "/output/entry.txt";

// The gate: /output/entry.txt must be UTF-8 text of 1 to 1 characters,
// not only white space. A single ASCII letter satisfies it exactly.
if (LETTER.length !== 1) {
  throw new Error(`Entry must be exactly 1 character, got ${LETTER.length}`);
}
if (!/^[A-Z]$/.test(LETTER)) {
  throw new Error(`Entry must be one letter A-Z, got ${JSON.stringify(LETTER)}`);
}

// "Z" is the bounty description's own example ("Z for zero sleep"), so it
// is the most crowded letter in the field. "O" keeps the entry distinct.
if (LETTER === "Z") {
  throw new Error("Entry must not reuse the description's example letter Z");
}

mkdirSync(dirname(OUT_PATH), { recursive: true });
writeFileSync(OUT_PATH, LETTER, "utf8");

// Read back what was written: the file the judge sees must be
// byte-identical to the letter, with no trailing newline or extra bytes.
// Check both the string and the byte size on disk, so a stray newline
// (1 extra byte) can never slip through as a 2-byte file.
const written = readFileSync(OUT_PATH, "utf8");
if (written !== LETTER) {
  throw new Error("Verification failed: /output/entry.txt differs from the letter");
}
if (statSync(OUT_PATH).size !== 1) {
  throw new Error(`Verification failed: /output/entry.txt must be 1 byte, got ${statSync(OUT_PATH).size}`);
}
console.log(`Wrote ${JSON.stringify(LETTER)} (1 character) to ${OUT_PATH}`);
