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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.importBooks = void 0;
const fs_1 = __importDefault(require("fs"));
const readline_1 = __importDefault(require("readline"));
const path_1 = __importDefault(require("path"));
const bookService_1 = require("../services/bookService");
const importBooks = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, e_1, _b, _c;
    try {
        // Check if file was uploaded
        if (!req.file) {
            return res.status(400).json({ message: 'CSV file is required' });
        }
        const filePath = path_1.default.join(__dirname, '../uploads', req.file.filename);
        const fileStream = fs_1.default.createReadStream(filePath);
        const rl = readline_1.default.createInterface({ input: fileStream });
        let lineNumber = 0;
        let addedBooksCount = 0;
        const errorRows = [];
        try {
            // Process each line in the CSV
            for (var _d = true, rl_1 = __asyncValues(rl), rl_1_1; rl_1_1 = yield rl_1.next(), _a = rl_1_1.done, !_a;) {
                _c = rl_1_1.value;
                _d = false;
                try {
                    const line = _c;
                    lineNumber++;
                    // Skip the header row
                    if (lineNumber === 1)
                        continue;
                    const [title, author, publishedYearStr] = line.split(',');
                    const publishedYear = parseInt(publishedYearStr, 10);
                    // Validate data
                    if (!title || !author || isNaN(publishedYear)) {
                        errorRows.push(`Row ${lineNumber}: Invalid data`);
                        continue;
                    }
                    // Add the book to the database or service
                    yield bookService_1.BookService.addBook({ title, author, publishedYear });
                    addedBooksCount++;
                }
                finally {
                    _d = true;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (!_d && !_a && (_b = rl_1.return)) yield _b.call(rl_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        // Delete the uploaded file after processing
        fs_1.default.unlinkSync(filePath);
        // Send a response with the result
        res.status(200).json({ addedBooksCount, errorRows });
    }
    catch (error) {
        next(error);
    }
});
exports.importBooks = importBooks;
