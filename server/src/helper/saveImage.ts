import path from "path";
import fs from "fs";

export const saveImage = async (image: any): Promise<string | null> => {
  if (!image) return null;

  const { createReadStream, filename } = await image;
  const uploadDir = path.join(__dirname, "../../public/uploads");

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const uniqueFilename = `${Date.now()}-${filename}`;
  const filePath = path.join(uploadDir, uniqueFilename);

  const stream = createReadStream();
  await new Promise((resolve, reject) =>
    stream
      .pipe(fs.createWriteStream(filePath))
      .on("finish", resolve)
      .on("error", reject)
  );

  return `uploads/${uniqueFilename}`;
};
