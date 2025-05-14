import { Book } from "../models/bookModel";
import { v4 as uuidv4 } from "uuid";

// Initial in-memory data for books
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
  // Get all books
  static getAllBooks(): Book[] {
    return books;
  }

  // Get a book by ID
  static getBookById(id: string): Book | undefined {
    return books.find((book) => book.id === id);
  }

  // Add a new book
  static addBook(data: Omit<Book, "id">): Book {
    const newBook: Book = { id: uuidv4(), ...data };
    books.push(newBook);
    return newBook;
  }

  // Update an existing book
  static updateBook(id: string, data: Partial<Omit<Book, "id">>): Book | undefined {
    const book = books.find((b) => b.id === id);
    if (!book) return undefined;
    Object.assign(book, data);
    return book;
  }

  // Delete a book
  static deleteBook(id: string): boolean {
    const index = books.findIndex((b) => b.id === id);
    if (index === -1) return false;
    books.splice(index, 1);
    return true;
  }
}
