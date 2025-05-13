"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bookController_1 = require("./controllers/bookController");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Define routes
app.get('/books', bookController_1.BookController.getAllBooks);
app.get('/books/:id', bookController_1.BookController.getBookById);
app.post('/books', bookController_1.BookController.addBook);
app.put('/books/:id', bookController_1.BookController.updateBook);
app.delete('/books/:id', bookController_1.BookController.deleteBook);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
