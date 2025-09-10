import fs from "fs";
import path from "path";
import crypto from "crypto";

// Source directory
const jsonDir = path.join(process.cwd(), "songs");

// Output file
const outputFile = path.join(process.cwd(), "all_songs.json");

// Compute the same short hash as in upload script
function generateId(title, artist = "") {
  const base = artist ? `${title}${artist}` : title;
  return crypto.createHash("sha1").update(base).digest("hex").slice(0, 8);
}

function consolidateSongs() {
  const files = fs.readdirSync(jsonDir).filter(f => f.endsWith(".json"));
  const consolidated = [];

  for (const file of files) {
    const filePath = path.join(jsonDir, file);
    const raw = fs.readFileSync(filePath, "utf8");
    let data;

    try {
      data = JSON.parse(raw);
    } catch (err) {
      console.error(`❌ Failed to parse JSON: ${file}`);
      continue;
    }

    const title = data.title || path.basename(file, ".json");
    const artist = data.artist || "";

    consolidated.push({
      id: generateId(title, artist),
      title,
      artist,
      active: false,
      singer: "",
      swc: 0,
      tnl: 0,
      event: 0,
    });
  }

  fs.writeFileSync(outputFile, JSON.stringify(consolidated, null, 2), "utf8");
  console.log(`✅ Consolidated ${consolidated.length} songs → ${outputFile}`);
}

consolidateSongs();
