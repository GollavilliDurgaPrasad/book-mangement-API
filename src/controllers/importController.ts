import { Response, NextFunction } from 'express';
// Define a custom type for Multer's file object
interface MulterFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  destination: string;
  filename: string;
  path: string;
  buffer: Buffer;
}

import fs from 'fs';
import readline from 'readline';
import path from 'path';
import { BookService } from '../services/bookService';
// Custom request interface to include `file`
interface MulterRequest extends Request {
  file: MulterFile;
}

export const importBooks = async (req: MulterRequest, res: Response, next: NextFunction) => {
  try {
    // Check if file was uploaded
    if (!req.file) {
      return res.status(400).json({ message: 'CSV file is required' });
    }

    const filePath = path.join(__dirname, '../uploads', req.file.filename);
    const fileStream = fs.createReadStream(filePath);
    const rl = readline.createInterface({ input: fileStream });

    let lineNumber = 0;
    let addedBooksCount = 0;
    const errorRows: string[] = [];

    // Process each line in the CSV
    for await (const line of rl) {
      lineNumber++;

      // Skip the header row
      if (lineNumber === 1) continue;

      const [title, author, publishedYearStr] = line.split(',');
      const publishedYear = parseInt(publishedYearStr, 10);

      // Validate data
      if (!title || !author || isNaN(publishedYear)) {
        errorRows.push(`Row ${lineNumber}: Invalid data`);
        continue;
      }

      // Add the book to the database or service
      await BookService.addBook({ title, author, publishedYear });
      addedBooksCount++;
    }

    // Delete the uploaded file after processing
    fs.unlinkSync(filePath);

    // Send a response with the result
    res.status(200).json({ addedBooksCount, errorRows });
  } catch (error) {
    next(error);
  }
};
