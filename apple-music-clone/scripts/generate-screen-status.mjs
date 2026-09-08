import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const sourcePath = path.join(root, "lib", "reference.ts");
const outputPath = path.join(root, "reference", "screen-status.md");
const source = fs.readFileSync(sourcePath, "utf8");
const ids = [...source.matchAll(/^\s+"([0-9a-f-]{36})",$/gm)].map((match) => match[1]);

if (ids.length !== 159) {
  throw new Error(`Expected 159 screen IDs in ${sourcePath}, found ${ids.length}`);
}

const rows = ids.map((id, index) => {
  const referenceEvidence = index < 8 ? "SAMPLED / detail opened" : "LISTED / not individually opened";
  return `| ${index + 1} | \`${id}\` | [\`/screen/${id}\`](http://127.0.0.1:6431/screen/${id}) | MAPPED | ${referenceEvidence} | NOT COMPARED |`;
}).join("\n");

const document = `# Exhaustive screen status\n\nGenerated from [lib/reference.ts](../lib/reference.ts) with \`pnpm inventory:screen-status\`.\n\nThe local route is implemented for every collected Mobbin ID. The first eight IDs were used as representative visual samples during the authenticated reference pass. The remaining IDs were collected from the lazy-loaded list and are deliberately marked as not individually opened or screenshot-compared. \"MAPPED\" is implementation coverage, not a 1:1 parity claim.\n\n| # | Mobbin ID | Local route | Route status | Reference evidence | Exact parity |\n| ---: | --- | --- | --- | --- | --- |\n${rows}\n`;

fs.writeFileSync(outputPath, document, "utf8");
console.log(`Wrote ${ids.length} screen rows to ${outputPath}`);
