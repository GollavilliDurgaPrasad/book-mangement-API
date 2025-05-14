import { Request, Response, NextFunction } from "express";
import { BookService } from "../services/bookService";

export class BookController {
  // Get all books




static async getAllBooks(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  try {
    const books = await BookService.getAllBooks();
    console.log("Fetched books:", books); // Log to check the fetched books
    return res.status(200).json(books);
  } catch (error) {
    console.error("Error fetching books:", error); // Log any error
    return next(error); // Pass error to global handler
  }
}





  // Get book by ID
  static async getBookById(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const book = await BookService.getBookById(req.params.id);
      if (!book) return res.status(404).json({ message: "Book not found" });
      return res.status(200).json(book);
    } catch (error) {
      return next(error); // Pass error to global handler
    }
  }

  // Add a new book
  static async addBook(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { title, author, publishedYear } = req.body;
      if (!title || !author || !publishedYear) {
        return res.status(400).json({ message: "Missing required fields" });
      }
      const book = await BookService.addBook({ title, author, publishedYear });
      return res.status(201).json(book);
    } catch (error) {
      return next(error); // Pass error to global handler
    }
  }

  // Update an existing book
  static async updateBook(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { title, author, publishedYear } = req.body;
      const updatedBook = await BookService.updateBook(req.params.id, { title, author, publishedYear });
      if (!updatedBook) return res.status(404).json({ message: "Book not found" });
      return res.status(200).json(updatedBook);
    } catch (error) {
      return next(error); // Pass error to global handler
    }
  }

  // Delete a book
  static async deleteBook(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const deleted = await BookService.deleteBook(req.params.id);
      if (!deleted) return res.status(404).json({ message: "Book not found" });
      return res.status(200).json({ message: "Book deleted successfully" });
    } catch (error) {
      return next(error); // Pass error to global handler
    }
  }
}
