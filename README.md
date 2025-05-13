# 📚 Book Management API

A simple RESTful API built with **Node.js**, **Express**, and **TypeScript** for managing books. This project supports basic CRUD operations: create, read, update, and delete book records.

---

## 🚀 Features

- Add new books
- Retrieve all books
- Retrieve a book by ID
- Update existing book information
- Delete books
- Built with TypeScript for type safety
- Uses UUID for unique book IDs

---

## 📁 Project Structure

book-management-api/
├── controllers/
│ └── bookController.ts
├── models/
│ └── bookModel.ts
├── routes/
│ └── bookRoutes.ts
├── services/
│ └── bookService.ts
├── server.ts
├── tsconfig.json
├── package.json
└── README.md

yaml
Copy
Edit

---

## 🛠️ Installation

1. **Clone the repository:**

```bash
git clone https://github.com/GollavilliDurgaPrasad/book-management-api.git
cd book-management-api
Install dependencies:

bash
Copy
Edit
npm install
Run the development server: npx nodemon server.ts

The server will start at http://localhost:3000.

🧪 API Endpoints
Method	Endpoint	Description
GET	http://localhost:3000/books	                Get all books
GET	http://localhost:3000/books/:id	                Get a book by ID
POST	http://localhost:3000/books	                Add a new book
PUT	http://localhost:3000/books/:id         	Update a book
DELETE	http://localhost:3000/books/:id	                Delete a book

📌 Sample Request Format (POST)
json
Copy
Edit
{
  "title": "Atomic Habits",
  "author": "James Clear",
  "publishedYear": 2018
}
🧩 Tech Stack
Node.js

Express.js

TypeScript

UUID

ts-node

nodemon

👨‍💻 Author
Gollavilli Durga Prasad
📧 prasadgollavilli8365@gmail.com
🌐 GitHub Profile

📝 License
This project is licensed under the MIT License.

yaml
Copy
Edit

---

### ✅ How to use it

1. Copy the content above.
2. Create a file named `README.md` in the root of your project.
3. Paste and save the content.

Let me know if you want badges, deployment instructions, or Postman collection setup added!







