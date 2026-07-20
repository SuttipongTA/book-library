// ref: 37aa88161f
import { useEffect, useRef, useState } from 'react';
import axiosClient from '../api/axiosClient';
import BookForm from '../components/BookForm';
import BookList from '../components/BookList';

export default function BookLibrary() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const isFirstRender = useRef(true);
  const hasLoadedOnce = useRef(false);

  const loadBooks = async (search = '') => {
    setLoading(true);
    setError('');
    try {
      const rs = await axiosClient.get('/api/books', {
        params: search.trim() ? { search: search.trim() } : {},
      });
      setBooks(rs.data);
    } catch (err) {
      setError('โหลดข้อมูลหนังสือไม่สำเร็จ');
    } finally {
      setLoading(false);
      hasLoadedOnce.current = true;
    }
  };

  useEffect(() => {
    loadBooks();
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const timer = setTimeout(() => {
      loadBooks(searchTerm);
    }, 400);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    if (!alertMessage) return;
    const timer = setTimeout(() => setAlertMessage(''), 3000);
    return () => clearTimeout(timer);
  }, [alertMessage]);

  const hdlAddBook = async (book) => {
    try {
      const rs = await axiosClient.post('/api/books', book);
      setBooks((prv) => [rs.data, ...prv]);
      setAlertMessage('เพิ่มหนังสือเรียบร้อย');
    } catch (err) {
      setError('เพิ่มหนังสือไม่สำเร็จ');
    }
  };

  const hdlDeleteBook = async (id) => {
    try {
      await axiosClient.delete(`/api/books/${id}`);
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

      {!hasLoadedOnce.current && loading ? (
        <p>กำลังโหลด...</p>
      ) : (
        <BookList
          books={books}
          onDeleteBook={hdlDeleteBook}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />
      )}
    </div>
  );
}