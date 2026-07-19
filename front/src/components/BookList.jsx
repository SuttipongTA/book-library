// ref: 37aa88161f
import { useMemo, useState } from 'react';

export default function BookList({ books, onDeleteBook }) {
  const [categoryFilter, setCategoryFilter] = useState('all');

  const filteredBooks = useMemo(() => {
    if (categoryFilter === 'all') return books;
    return books.filter((book) => book.category === categoryFilter);
  }, [books, categoryFilter]);

  const categories = useMemo(() => {
    const unique = new Set(books.map((b) => b.category));
    return ['all', ...unique];
  }, [books]);

  const totalCount = useMemo(() => books.length, [books]);

  return (
    <div className="book-list">
      <div className="book-list-header">
        <h2>รายการหนังสือ ({totalCount} เล่ม)</h2>
        <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat === 'all' ? 'ทุกหมวดหมู่' : cat}
            </option>
          ))}
        </select>
      </div>

      {filteredBooks.length === 0 && <p>ยังไม่มีหนังสือในรายการนี้</p>}

      <ul>
        {filteredBooks.map((book) => (
          <li key={book.id}>
            <div>
              <strong>{book.title}</strong> — {book.author}
              <span className="badge">{book.category}</span>
            </div>
            <button onClick={() => onDeleteBook(book.id)}>ลบ</button>
          </li>
        ))}
      </ul>
    </div>
  );
}