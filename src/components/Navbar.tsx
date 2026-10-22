import { Link, useNavigate } from 'react-router-dom';

interface NavbarProps {
  isLoggedIn: boolean;
  onLogout: () => void;
}

export default function Navbar({ isLoggedIn, onLogout }: NavbarProps) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">MiniBlog</Link>
      </div>
      <div className="navbar-links">
        <Link to="/">Trang chủ</Link>
        {isLoggedIn && <Link to="/create">Viết bài</Link>}
        {isLoggedIn ? (
          <button className="btn-logout" onClick={handleLogout}>
            Đăng xuất
          </button>
        ) : (
          <Link to="/login" className="btn-login-link">
            Đăng nhập
          </Link>
        )}
      </div>
    </nav>
  );
}
