import { copyFile, writeFile } from "node:fs/promises";
import path from "node:path";

const distDir = path.resolve("dist");

await copyFile(path.join(distDir, "index.html"), path.join(distDir, "404.html"));
await writeFile(path.join(distDir, ".nojekyll"), "");
