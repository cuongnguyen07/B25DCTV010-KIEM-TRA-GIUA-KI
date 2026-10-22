import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './pages/HomePage';
import PostDetailPage from './pages/PostDetailPage';
import LoginPage from './pages/LoginPage';
import CreatePostPage from './pages/CreatePostPage';
import NotFoundPage from './pages/NotFoundPage';
import './App.css';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
    localStorage.getItem('isLoggedIn') === 'true'
  );

  const handleLogin = () => {
    localStorage.setItem('isLoggedIn', 'true');
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  };

  return (
    <BrowserRouter>
      <div className="app-layout">
        <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />

        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/posts/:id" element={<PostDetailPage />} />
            <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
            <Route
              path="/create"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <CreatePostPage />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>

        <footer className="footer">
          <p>MiniBlog</p>
        </footer>
      </div>
    </BrowserRouter>
  );
}
