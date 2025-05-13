import { Book } from "../models/bookModel";
import { v4 as uuidv4 } from "uuid";

let books: Book[] = [
  {
    id: uuidv4(),
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    publishedYear: 1925,
  },
  {
    id: uuidv4(),
    title: "1984",
    author: "George Orwell",
    publishedYear: 1949,
  },
];

export class BookService {
    static getAllBooks(): Book[] {
        return books;
    }

    static getBookById(id: string): Book | undefined {
        return books.find((book) => book.id === id);
    }

    static addBook(data: Omit<Book, "id">): Book {
        const newBook: Book = { id: uuidv4(), ...data };
        books.push(newBook);
        return newBook;
    }

    static updateBook(id: string, data: Partial<Omit<Book, "id">>): Book | undefined {
        const book = books.find((b) => b.id === id);
        if (!book) return undefined;
        Object.assign(book, data);
        return book;
    }

    static deleteBook(id: string): boolean {
        const index = books.findIndex((b) => b.id === id);
        if (index === -1) return false;
        books.splice(index, 1);
        return true;
    }
}