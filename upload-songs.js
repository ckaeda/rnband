import fs from "fs";
import path from "path";
import crypto from "crypto";
import { put } from "@vercel/blob";
import "dotenv/config";

// Directories
const jsonDir = path.join(process.cwd(), "songs");
const txtDir = path.join(process.cwd(), "txt");

// CLI flag
const isDryRun = process.argv.includes("--dry-run");

// --- Utils ---
function normalize(str = "") {
  return str.trim().toLowerCase().replace(/[^a-z0-9]+/g, "");
}

function generateId(title, artist = "") {
  const base = normalize(title) + normalize(artist);
  return crypto.createHash("sha1").update(base).digest("hex").slice(0, 8);
}

function generateFilename(title, artist, ext) {
  const id = generateId(title, artist);
  const safeTitle = title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  return `${safeTitle}_${id}.${ext}`;
}

async function uploadFile(buffer, folder, blobName) {
  if (isDryRun) {
    console.log(`(dry-run) Would upload → ${folder}/${blobName}`);
    return `dry-run://${folder}/${blobName}`;
  }

  const { url } = await put(`${folder}/${blobName}`, buffer, {
    access: "public",
    token: process.env.BLOB_READ_WRITE_TOKEN,
  });
  return url;
}

async function processSongs() {
  const files = fs.readdirSync(jsonDir).filter(f => f.endsWith(".json"));
  const index = [];
  let processed = 0;

  for (const file of files) {
    const jsonPath = path.join(jsonDir, file);
    const baseName = path.basename(file, ".json"); // filename without .json
    const txtPath = path.join(txtDir, `${baseName}.txt`);

    // --- Pair check ---
    if (!fs.existsSync(txtPath)) {
      console.error(`❌ Skipping ${baseName}, missing TXT pair`);
      continue;
    }

    // --- Extract title + artist from filename ---
    let title = baseName;
    let artist = "";
    const parts = baseName.split("_");
    if (parts.length > 1) {
      artist = parts.pop();
      title = parts.join("_");
    }

    // --- Read buffers ---
    const jsonBuffer = fs.readFileSync(jsonPath);
    const txtBuffer = fs.readFileSync(txtPath);

    // --- Generate names + ID ---
    const jsonBlobName = generateFilename(title, artist, "json");
    const txtBlobName = generateFilename(title, artist, "txt");
    const id = generateId(title, artist);

    try {
      // Upload both files
      const jsonUrl = await uploadFile(jsonBuffer, "json", jsonBlobName);
      const txtUrl = await uploadFile(txtBuffer, "txt", txtBlobName);

      // Parse JSON for metadata (but filename pairing stays primary)
      let data;
      try {
        data = JSON.parse(jsonBuffer.toString("utf8"));
      } catch {
        data = {};
      }

      index.push({
        id,
        title: data.title || title,
        artist: data.artist || artist,
        active: false,
        swc: 0,
        tnl: 0,
        event: 0,
      });

      console.log(`✅ Uploaded pair: ${baseName}`);
      console.log(`   JSON: ${jsonUrl}`);
      console.log(`   TXT:  ${txtUrl}`);
      processed++;
    } catch (err) {
      console.error(`❌ Failed for ${baseName}: ${err.message}`);
    }
  }

  // --- Save consolidated index locally ---
  const indexPath = path.join(process.cwd(), "all_songs.json");
  fs.writeFileSync(indexPath, JSON.stringify(index, null, 2), "utf8");
  console.log(`\n✅ Consolidated ${index.length} songs → ${indexPath}`);

  if (!isDryRun) {
    try {
      const buffer = fs.readFileSync(indexPath);
      const { url } = await put("index/all_songs.json", buffer, {
        access: "public",
        token: process.env.BLOB_READ_WRITE_TOKEN,
      });
      console.log(`📂 Uploaded master index → ${url}`);
    } catch (err) {
      console.error(`❌ Failed to upload index: ${err.message}`);
    }
  } else {
    console.log("(dry-run) Skipped uploading master index.");
  }

  console.log(`\n🎉 Finished processing ${processed} complete songs.`);
}

processSongs().catch(err => {
  console.error("❌ Fatal Error:", err.message);
  process.exit(1);
});
