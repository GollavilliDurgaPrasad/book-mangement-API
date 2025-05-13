import express from 'express';
import { BookController } from './controllers/bookController';
import cors from "cors";
app.use(cors());


const app = express();
app.use(express.json());

// Define the routes for books
app.get('/books', BookController.getAllBooks);
app.get('/books/:id', BookController.getBookById);
app.post('/books', BookController.addBook);
app.put('/books/:id', BookController.updateBook);
app.delete('/books/:id', BookController.deleteBook);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
