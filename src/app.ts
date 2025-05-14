import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { BookController } from "./controllers/bookController";

dotenv.config(); // Load environment variables from .env file

const app = express();

app.use(cors()); // Enable CORS
app.use(express.json());

// Define routes
app.get("/books", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const books = await BookController.getAllBooks(req, res, next);
    console.log("Fetched books:", books); // Log the result (optional)
  } catch (error) {
    console.error("Error fetching books:", error); // Log error if fetching fails
    next(error);
  }
});

app.get(
  "/books/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await BookController.getBookById(req, res, next);
    } catch (error) {
      console.error("Error fetching book by ID:", error);
      next(error);
    }
  }
);

app.post("/books", async (req: Request, res: Response, next: NextFunction) => {
  try {
    await BookController.addBook(req, res, next);
  } catch (error) {
    console.error("Error adding book:", error);
    next(error);
  }
});

app.put(
  "/books/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const updatedBook = await BookController.updateBook(req, res, next);
      console.log("Updated book:", updatedBook); // Log the result (optional)
    } catch (error) {
      console.error("Error updating book:", error); // Log error if updating fails
      next(error);
    }
  }
);

app.delete(
  "/books/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await BookController.deleteBook(req, res, next);
    } catch (error) {
      console.error("Error deleting book:", error);
      next(error);
    }
  }
);

// Global error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error("Error: ", err);
  res
    .status(500)
    .json({ message: "Internal Server Error", error: err.message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
