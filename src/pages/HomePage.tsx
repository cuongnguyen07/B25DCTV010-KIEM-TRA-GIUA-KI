import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import type { Post } from '../types';

export default function HomePage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        if (!response.ok) {
          throw new Error('Lỗi tải dữ liệu');
        }

        const apiPosts: Post[] = await response.json();
        const stored = localStorage.getItem('localPosts');
        const localPosts: Post[] = stored ? JSON.parse(stored) : [];

        setPosts([...localPosts, ...apiPosts]);
      } catch {
        setError('Không thể tải danh sách bài viết.');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase().trim())
  );

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Danh Sách Bài Viết</h1>
      </div>

      <div className="search-box">
        <input
          type="text"
          placeholder="Tìm kiếm bài viết theo tiêu đề..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <button className="btn-clear" onClick={() => setSearchTerm('')}>
            Xoá
          </button>
        )}
      </div>

      {loading && (
        <div className="status-message loading">
          <p>Đang tải dữ liệu bài viết...</p>
        </div>
      )}

      {error && (
        <div className="status-message error">
          <p>{error}</p>
        </div>
      )}

      {!loading && !error && (
        <>
          <p className="result-count">
            Tìm thấy {filteredPosts.length} bài viết
          </p>

          {filteredPosts.length === 0 ? (
            <p className="no-data">Không tìm thấy bài viết nào.</p>
          ) : (
            <div className="post-list">
              {filteredPosts.map((post) => (
                <div key={post.id} className="post-card">
                  <span className="post-id">ID: #{post.id}</span>
                  <h3 className="post-title">{post.title}</h3>
                  <p className="post-body">
                    {post.body.length > 100
                      ? post.body.substring(0, 100) + '...'
                      : post.body}
                  </p>
                  <div className="post-actions">
                    <Link to={`/posts/${post.id}`} className="btn-detail">
                      Xem chi tiết
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
