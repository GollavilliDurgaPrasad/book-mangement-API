# Book Management REST API

## Setup Instructions

```bash
npm install
npm run dev
```

### API Endpoints

- `GET /api/books`
- `GET /api/books/:id`
- `POST /api/books`
- `PUT /api/books/:id`
- `DELETE /api/books/:id`
- `POST /api/books/import` (CSV Upload)

### CSV Format
```
title,author,publishedYear
Book One,Author A,2023
Book Two,Author B,2022
```