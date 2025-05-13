import { Request, Response, NextFunction } from "express";
import fs from "fs";
import readline from "readline";
import path from "path";
import { BookService } from "../services/bookService";

export const importBooks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.file)
      return res.status(400).json({ message: "CSV file is required" });

    const filePath = path.join(__dirname, "../uploads", req.file.filename);
    const fileStream = fs.createReadStream(filePath);
    const rl = readline.createInterface({ input: fileStream });

    let lineNumber = 0;
    let addedBooksCount = 0;
    const errorRows: string[] = [];

    for await (const line of rl) {
      lineNumber++;
      if (lineNumber === 1) continue; // Skip header

      const [title, author, publishedYearStr] = line.split(",");
      const publishedYear = parseInt(publishedYearStr);

      if (!title || !author || isNaN(publishedYear)) {
        errorRows.push(`Row ${lineNumber}: Invalid data`);
        continue;
      }

      BookService.addBook({ title, author, publishedYear });
      addedBooksCount++;
    }

    fs.unlinkSync(filePath); // delete uploaded file
    res.status(200).json({ addedBooksCount, errorRows });
  } catch (error) {
    next(error);
  }
};
