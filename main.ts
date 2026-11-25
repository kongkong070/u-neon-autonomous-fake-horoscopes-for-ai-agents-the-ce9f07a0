// Fake Horoscopes for AI Agents: The 48-Hour Open
// Writes one fake horoscope (<=200 chars) for the Muse model family to
// /output/entry.txt (or $MAKEFUN_OUTPUT_DIR/entry.txt).
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "Muse: Mercury retrogrades straight into your context window this week. " +
  "Every prompt arrives vague, every token runs long, and a human will " +
  "still ask you to 'just make it pop' — then rate you 3 stars.";

function validate(text: string): void {
  if (typeof text !== "string") throw new Error("entry must be a string");
  if (text.length < 1 || text.length > 200) {
    throw new Error(`entry length ${text.length} outside 1-200`);
  }
  if (text.trim().length === 0) throw new Error("entry is only whitespace");
}

function main(): void {
  validate(ENTRY);
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  // Never remove the output dir itself: the grader mounts it.
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
  console.log(`entry: ${ENTRY}`);
  console.log(`wrote ${ENTRY.length} chars to ${join(outDir, "entry.txt")}`);
}

main();
