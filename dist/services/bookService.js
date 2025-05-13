"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookService = void 0;
const uuid_1 = require("uuid");
let books = [
    {
        id: (0, uuid_1.v4)(),
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        publishedYear: 1925,
    },
    {
        id: (0, uuid_1.v4)(),
        title: "1984",
        author: "George Orwell",
        publishedYear: 1949,
    },
];
class BookService {
    static getAllBooks() {
        return books;
    }
    static getBookById(id) {
        return books.find((book) => book.id === id);
    }
    static addBook(data) {
        const newBook = Object.assign({ id: (0, uuid_1.v4)() }, data);
        books.push(newBook);
        return newBook;
    }
    static updateBook(id, data) {
        const book = books.find((b) => b.id === id);
        if (!book)
            return undefined;
        Object.assign(book, data);
        return book;
    }
    static deleteBook(id) {
        const index = books.findIndex((b) => b.id === id);
        if (index === -1)
            return false;
        books.splice(index, 1);
        return true;
    }
}
exports.BookService = BookService;
