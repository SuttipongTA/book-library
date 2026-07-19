// ref: 37aa88161f
import axios from 'axios';
import { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';
import BookForm from '../components/BookForm';
import BookList from '../components/BookList';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export default function BookLibrary() {
  const { token } = useAuth();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  const loadBooks = async () => {
    setLoading(true);
    setError('');
    try {
      const rs = await axios.get(`${API_URL}/api/books`);
      setBooks(rs.data);
    } catch (err) {
      setError('โหลดข้อมูลหนังสือไม่สำเร็จ');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBooks();
  }, []);

  useEffect(() => {
    if (!alertMessage) return;
    const timer = setTimeout(() => setAlertMessage(''), 3000);
    return () => clearTimeout(timer);
  }, [alertMessage]);

  const hdlAddBook = async (book) => {
    try {
      const rs = await axios.post(`${API_URL}/api/books`, book, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBooks((prv) => [rs.data, ...prv]);
      setAlertMessage('เพิ่มหนังสือเรียบร้อย');
    } catch (err) {
      setError('เพิ่มหนังสือไม่สำเร็จ');
    }
  };

  const hdlDeleteBook = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/books/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBooks((prv) => prv.filter((b) => b.id !== id));
      setAlertMessage('ลบหนังสือเรียบร้อย');
    } catch (err) {
      setError('ลบหนังสือไม่สำเร็จ');
    }
  };

  return (
    <div className="home-page">
      {alertMessage && <div className="alert">{alertMessage}</div>}
      {error && <div className="error">{error}</div>}

      <BookForm onAddBook={hdlAddBook} loading={loading} />

      {loading ? (
        <p>กำลังโหลด...</p>
      ) : (
        <BookList books={books} onDeleteBook={hdlDeleteBook} />
      )}
    </div>
  );
}