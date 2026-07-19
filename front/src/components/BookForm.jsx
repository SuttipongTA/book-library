// ref: 37aa88161f
import { useRef, useState } from 'react';

export default function BookForm({ onAddBook, loading }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('');

  const titleInputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !author.trim()) return;

    await onAddBook({ title, author, category });

    setTitle('');
    setAuthor('');
    setCategory('');
    titleInputRef.current?.focus();
  };

  return (
    <form onSubmit={handleSubmit} className="book-form">
      <h2>เพิ่มหนังสือใหม่</h2>

      <input
        ref={titleInputRef}
        type="text"
        placeholder="ชื่อหนังสือ"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="ผู้แต่ง"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />
      <input
        type="text"
        placeholder="หมวดหมู่ (ไม่บังคับ)"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />

      <button type="submit" disabled={loading}>
        {loading ? 'กำลังบันทึก...' : 'บันทึกหนังสือ'}
      </button>
    </form>
  );
}