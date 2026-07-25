import fs from "fs";
import path from "path";

const knowledgeFolder = path.join(process.cwd(), "public", "knowledge");

const outputFile = path.join(
  process.cwd(),
  "public",
  "knowledge.json"
);

const files = fs
  .readdirSync(knowledgeFolder)
  .filter((file) => file.toLowerCase().endsWith(".pdf"));

const knowledge = [];

for (const file of files) {
  knowledge.push({
    fileName: file,
    path: `/knowledge/${file}`,
    importedAt: new Date().toISOString(),
  });
}

fs.writeFileSync(
  outputFile,
  JSON.stringify(knowledge, null, 2)
);

console.log("✅ knowledge.json created successfully");
console.log(knowledge);