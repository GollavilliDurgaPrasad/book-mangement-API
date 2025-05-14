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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const bookController_1 = require("./controllers/bookController");
dotenv_1.default.config(); // Load environment variables from .env file
const app = (0, express_1.default)();
app.use((0, cors_1.default)()); // Enable CORS
app.use(express_1.default.json());
// Define routes
app.get("/books", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const books = yield bookController_1.BookController.getAllBooks(req, res, next);
        console.log("Fetched books:", books); // Log the result (optional)
    }
    catch (error) {
        console.error("Error fetching books:", error); // Log error if fetching fails
        next(error);
    }
}));
app.get("/books/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield bookController_1.BookController.getBookById(req, res, next);
    }
    catch (error) {
        console.error("Error fetching book by ID:", error);
        next(error);
    }
}));
app.post("/books", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield bookController_1.BookController.addBook(req, res, next);
    }
    catch (error) {
        console.error("Error adding book:", error);
        next(error);
    }
}));
app.put("/books/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedBook = yield bookController_1.BookController.updateBook(req, res, next);
        console.log("Updated book:", updatedBook); // Log the result (optional)
    }
    catch (error) {
        console.error("Error updating book:", error); // Log error if updating fails
        next(error);
    }
}));
app.delete("/books/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield bookController_1.BookController.deleteBook(req, res, next);
    }
    catch (error) {
        console.error("Error deleting book:", error);
        next(error);
    }
}));
// Global error handler
app.use((err, req, res, next) => {
    console.error("Error: ", err);
    res
        .status(500)
        .json({ message: "Internal Server Error", error: err.message });
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
