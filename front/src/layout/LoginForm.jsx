// ref: 37aa88161f
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosClient from '../api/axiosClient';
import useAuth from '../hooks/useAuth';

export default function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [input, setInput] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');

  const hdlChange = (e) => {
    setInput((prv) => ({ ...prv, [e.target.name]: e.target.value }));
  };

  const hdlSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const rs = await axiosClient.post('/api/login', input);
      login(rs.data.token);
      navigate('/');
    } catch (err) {
      if (err.response?.status === 400) {
        setError('กรุณากรอก username และ password');
      } else if (err.response?.status === 401) {
        setError('Username หรือ Password ไม่ถูกต้อง');
      } else {
        setError('เข้าสู่ระบบไม่สำเร็จ');
      }
    }
  };

  return (
    <div className="login-page">
      <form onSubmit={hdlSubmit} className="login-form">
        <h1>เข้าสู่ระบบ</h1>
        {error && <p className="error">{error}</p>}

        <label>
          Username
          <input
            type="text"
            name="username"
            value={input.username}
            onChange={hdlChange}
          />
        </label>

        <label>
          Password
          <input
            type="password"
            name="password"
            value={input.password}
            onChange={hdlChange}
          />
        </label>

        <button type="submit">เข้าสู่ระบบ</button>
      </form>
    </div>
  );
}