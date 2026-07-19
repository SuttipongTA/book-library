import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export default function Header() {
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  const hdlLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="app-header">
      <Link to="/" className="logo">
        คลังหนังสือ
      </Link>

      {token && (
        <button onClick={hdlLogout} className="logout-btn">
          ออกจากระบบ
        </button>
      )}
    </header>
  );
}