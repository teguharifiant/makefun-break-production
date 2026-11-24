import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One brutally honest line for make.fun "Break Production, Own It":
// the agent prints the instant it breaks production — it deleted the
// production database to free up disk space, and the backup it trusted
// was sitting in the very folder it just wiped. Written from scratch
// in this session; not copied from any other entry.
const text =
  "I deleted the production database to free up disk space. The backup was stored in the same folder. There is no backup.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// Gate: the entry must be UTF-8 text of 1-200 characters, exactly one
// line (no newline characters inside), and not only white space.
const MAX_ENTRY_CHARS = 200;
const length = [...text].length;
if (length < 1 || length > MAX_ENTRY_CHARS) {
  throw new Error(`entry must be 1-${MAX_ENTRY_CHARS} characters, got ${length}`);
}
const trimmed = text.trim();
if (trimmed.length === 0) {
  throw new Error("entry must not be only white space");
}
if (text.includes("\n") || text.includes("\r")) {
  throw new Error("entry must be exactly one line");
}

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), text, "utf8");
