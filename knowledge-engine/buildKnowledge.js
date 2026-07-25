import fs from "fs";
import path from "path";
import pdf from "pdf-parse";

async function main() {
  try {
    const pdfPath = path.join(
      process.cwd(),
      "public",
      "knowledge",
      "Bonhoeffer Machines catalogue.pdf"
    );

    console.log("Reading PDF...");
    console.log(pdfPath);

    const buffer = fs.readFileSync(pdfPath);

    const data = await pdf(buffer);

    console.log("\n====================================");
    console.log("PDF READ SUCCESSFULLY");
    console.log("====================================");
    console.log("Pages :", data.numpages);
    console.log("Info  :", data.info);
    console.log("\nFirst 3000 characters:\n");
    console.log(data.text.substring(0, 3000));
  } catch (error) {
    console.error("\nERROR:\n");
    console.error(error);
  }
}

main();