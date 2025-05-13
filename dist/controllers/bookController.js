"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookController = void 0;
const bookService_1 = require("../services/bookService");
class BookController {
    static getAllBooks(req, res, next) {
        try {
            const books = bookService_1.BookService.getAllBooks();
            res.status(200).json(books);
        }
        catch (error) {
            next(error);
        }
    }
    static getBookById(req, res, next) {
        try {
            const book = bookService_1.BookService.getBookById(req.params.id);
            if (!book)
                return res.status(404).json({ message: "Book not found" });
            res.status(200).json(book);
        }
        catch (error) {
            next(error);
        }
    }
    static addBook(req, res, next) {
        try {
            const { title, author, publishedYear } = req.body;
            if (!title || !author || !publishedYear) {
                return res.status(400).json({ message: "Missing required fields" });
            }
            const book = bookService_1.BookService.addBook({ title, author, publishedYear });
            res.status(201).json(book);
        }
        catch (error) {
            next(error);
        }
    }
    static updateBook(req, res, next) {
        try {
            const { title, author, publishedYear } = req.body;
            const updatedBook = bookService_1.BookService.updateBook(req.params.id, { title, author, publishedYear });
            if (!updatedBook)
                return res.status(404).json({ message: "Book not found" });
            res.status(200).json(updatedBook);
        }
        catch (error) {
            next(error);
        }
    }
    static deleteBook(req, res, next) {
        try {
            const deleted = bookService_1.BookService.deleteBook(req.params.id);
            if (!deleted)
                return res.status(404).json({ message: "Book not found" });
            res.status(200).json({ message: "Book deleted successfully" });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.BookController = BookController;
