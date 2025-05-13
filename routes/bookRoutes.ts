import express from "express";
import { BookController } from "../controllers/bookController";
import { importBooks } from "../controllers/importController";
import multer from "multer";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.get("/books", BookController.getAllBooks);
router.get("/books/:id", BookController.getBookById);
router.post("/books", BookController.addBook);
router.put("/books/:id", BookController.updateBook);
router.delete("/books/:id", BookController.deleteBook);
router.post("/books/import", upload.single("file"), importBooks);

export default router;


