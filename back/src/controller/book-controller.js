// ref: 37aa88161f 
const db = require("../db/database");
const createError = require("../utils/createError");

exports.getBooksLanding = async (req, res, next) => {
    try {
        const books = db.prepare('SELECT * FROM books ORDER BY created_at DESC').all();
        res.json(books);
    } catch (err) {
        next(err);
    }
};

exports.newBook = async (req, res, next) => {
    try {
        const { title, author, category } = req.body;

        if(!title || !author) {
            return createError(400, "title and author are required");
        }

        const insertBook = db.prepare('INSERT INTO books (title, author, category) VALUES (?, ?, ?)');
        const result = insertBook.run(title, author, category || 'ทั่วไป');
        const newBook = db.prepare('SELECT * FROM books WHERE id = ?').get(result.lastInsertRowid);

        res.status(201).json(newBook);
    } catch (err) {
        next(err);
    }
};

exports.deleteBook = async (req, res, next) => {
    try {
        const { id } = req.params;

        const book = db.prepare('SELECT * FROM books WHERE id = ?').get(id);
        if (!book) {
            return createError(404, "Book not found");
        }

        db.prepare('DELETE FROM books WHERE id = ?').run(id);

        res.json({ message: 'Book deleted', id: Number(id) });
    } catch (err) {
        next(err);
    }
};