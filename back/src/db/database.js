const Database = require("better-sqlite3");
const path = require("path");

const dbPath = path.join(__dirname, '..', '..', 'data', 'library.db');
const db = new Database(dbPath);

db.exec(`
  CREATE TABLE IF NOT EXISTS books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    category TEXT DEFAULT 'ทั่วไป',
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  )
`);

module.exports = db;