import fs from "fs";
import path from "path";
import crypto from "crypto";
import { put } from "@vercel/blob";
import "dotenv/config"; // Loads BLOB_READ_WRITE_TOKEN from .env

// Directories
const jsonDir = path.join(process.cwd(), "songs");
const txtDir = path.join(process.cwd(), "txt");

// Generate unique filename: title (+ artist if exists) + short hash
function generateFilename(title, artist, ext) {
  const base = artist ? `${title}${artist}` : title;
  const hash = crypto.createHash("sha1").update(base).digest("hex").slice(0, 8);
  const safeTitle = title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  return `${safeTitle}_${hash}.${ext}`;
}

// Upload file to Vercel Blob in correct subfolder
async function uploadFile(filePath, folder, blobName) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }
  const buffer = fs.readFileSync(filePath);
  const { url } = await put(`${folder}/${blobName}`, buffer, {
    access: "public",
    token: process.env.BLOB_READ_WRITE_TOKEN,
  });
  return url;
}

export async function uploadSong(title, artist = "") {
  // Build base filename (with or without artist)
  const baseName = artist ? `${title}_${artist}` : title;

  // Construct local file paths
  const jsonPath = path.join(jsonDir, `${baseName}.json`);
  const txtPath = path.join(txtDir, `${baseName}.txt`);

  // Generate blob filenames
  const jsonBlobName = generateFilename(title, artist, "json");
  const txtBlobName = generateFilename(title, artist, "txt");

  // Upload both files
  const jsonUrl = await uploadFile(jsonPath, "json", jsonBlobName);
  const txtUrl = await uploadFile(txtPath, "txt", txtBlobName);

  console.log(`✅ Uploaded: ${title}${artist ? " - " + artist : ""}`);
  console.log(`   JSON: ${jsonUrl}`);
  console.log(`   TXT:  ${txtUrl}`);

  return { title, artist, jsonUrl, txtUrl };
}

// Run directly from CLI
if (process.argv.length >= 3) {
  const title = process.argv[2];
  const artist = process.argv[3] || ""; // optional
  uploadSong(title, artist).catch(err => {
    console.error("❌ Error:", err.message);
    process.exit(1);
  });
} else {
  console.log("Usage: node upload-single-song.js <title> [artist]");
}
