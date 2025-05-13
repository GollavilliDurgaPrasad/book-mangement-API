import { Request, Response, NextFunction } from "express";
import { BookService } from "../services/bookService";

export class BookController {
    static getAllBooks(req: Request, res: Response, next: NextFunction) {
        try {
            const books = BookService.getAllBooks();
            res.status(200).json(books);
        } catch (error) {
            next(error);
        }
    }

    static getBookById(req: Request, res: Response, next: NextFunction) {
        try {
            const book = BookService.getBookById(req.params.id);
            if (!book) return res.status(404).json({ message: "Book not found" });
            res.status(200).json(book);
        } catch (error) {
            next(error);
        }
    }

    static addBook(req: Request, res: Response, next: NextFunction) {
        try {
            const { title, author, publishedYear } = req.body;
            if (!title || !author || !publishedYear) {
                return res.status(400).json({ message: "Missing required fields" });
            }
            const book = BookService.addBook({ title, author, publishedYear });
            res.status(201).json(book);
        } catch (error) {
            next(error);
        }
    }

    static updateBook(req: Request, res: Response, next: NextFunction) {
        try {
            const { title, author, publishedYear } = req.body;
            const updatedBook = BookService.updateBook(req.params.id, { title, author, publishedYear });
            if (!updatedBook) return res.status(404).json({ message: "Book not found" });
            res.status(200).json(updatedBook);
        } catch (error) {
            next(error);
        }
    }

    static deleteBook(req: Request, res: Response, next: NextFunction) {
        try {
            const deleted = BookService.deleteBook(req.params.id);
            if (!deleted) return res.status(404).json({ message: "Book not found" });
            res.status(200).json({ message: "Book deleted successfully" });
        } catch (error) {
            next(error);
        }
    }
}