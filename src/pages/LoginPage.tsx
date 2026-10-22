import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

interface LoginPageProps {
  onLogin: () => void;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!username.trim() || !password.trim()) {
      setError('Vui lòng nhập đầy đủ tài khoản và mật khẩu.');
      return;
    }

    if (username.trim() === 'admin' && password === '123456') {
      setError('');
      onLogin();
      navigate('/create');
    } else {
      setError('Tài khoản hoặc mật khẩu không chính xác.');
    }
  };

  return (
    <div className="page-container auth-container">
      <div className="auth-card">
        <h2>Đăng nhập</h2>
        <p className="auth-subtitle">Tài khoản: admin | Mật khẩu: 123456</p>

        {error && <div className="form-error-alert">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="username">Tên đăng nhập</label>
            <input
              id="username"
              type="text"
              placeholder="Nhập tên đăng nhập..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Mật khẩu</label>
            <input
              id="password"
              type="password"
              placeholder="Nhập mật khẩu..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="btn-primary btn-block">
            Đăng nhập
          </button>
        </form>
      </div>
    </div>
  );
}
