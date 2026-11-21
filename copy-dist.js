import fs from "node:fs";
import path from "node:path";

const dist = path.resolve("dist");
const distPublic = path.resolve("dist", "public");

if (fs.existsSync(dist)) {
  fs.mkdirSync(distPublic, { recursive: true });
  for (const item of fs.readdirSync(dist)) {
    if (item === "public") continue;
    fs.cpSync(path.join(dist, item), path.join(distPublic, item), { recursive: true });
  }
}
