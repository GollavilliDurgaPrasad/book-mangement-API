"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookController = void 0;
const bookService_1 = require("../services/bookService");
class BookController {
    // Get all books
    static getAllBooks(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const books = yield bookService_1.BookService.getAllBooks();
                console.log("Fetched books:", books); // Log to check the fetched books
                return res.status(200).json(books);
            }
            catch (error) {
                console.error("Error fetching books:", error); // Log any error
                return next(error); // Pass error to global handler
            }
        });
    }
    // Get book by ID
    static getBookById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const book = yield bookService_1.BookService.getBookById(req.params.id);
                if (!book)
                    return res.status(404).json({ message: "Book not found" });
                return res.status(200).json(book);
            }
            catch (error) {
                return next(error); // Pass error to global handler
            }
        });
    }
    // Add a new book
    static addBook(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { title, author, publishedYear } = req.body;
                if (!title || !author || !publishedYear) {
                    return res.status(400).json({ message: "Missing required fields" });
                }
                const book = yield bookService_1.BookService.addBook({ title, author, publishedYear });
                return res.status(201).json(book);
            }
            catch (error) {
                return next(error); // Pass error to global handler
            }
        });
    }
    // Update an existing book
    static updateBook(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { title, author, publishedYear } = req.body;
                const updatedBook = yield bookService_1.BookService.updateBook(req.params.id, { title, author, publishedYear });
                if (!updatedBook)
                    return res.status(404).json({ message: "Book not found" });
                return res.status(200).json(updatedBook);
            }
            catch (error) {
                return next(error); // Pass error to global handler
            }
        });
    }
    // Delete a book
    static deleteBook(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deleted = yield bookService_1.BookService.deleteBook(req.params.id);
                if (!deleted)
                    return res.status(404).json({ message: "Book not found" });
                return res.status(200).json({ message: "Book deleted successfully" });
            }
            catch (error) {
                return next(error); // Pass error to global handler
            }
        });
    }
}
exports.BookController = BookController;
