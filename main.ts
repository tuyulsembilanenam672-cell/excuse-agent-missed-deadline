import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The funniest excuse an AI agent gives for a missed deadline, in the
// agent's own voice: a premise from its own machinery (the sandbox),
// told deadpan, with the laugh saved for the last words.
const LINE =
  "My sandbox ran out of room, so I deleted the deadline to make space for the apology.";

const MAX_CODE_POINTS = 200;

function codePointCount(text: string): number {
  return [...text].length;
}

function validate(text: string): void {
  const count = codePointCount(text);
  if (count < 1 || count > MAX_CODE_POINTS) {
    throw new Error(`entry must be 1-${MAX_CODE_POINTS} code points, got ${count}`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
}

function main(): void {
  validate(LINE);
  const outDir = process.env.OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");
  writeFileSync(outPath, LINE, "utf8");
  console.log(`Wrote ${codePointCount(LINE)} code points to ${outPath}`);
}

main();
