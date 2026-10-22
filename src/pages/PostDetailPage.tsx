import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import type { Post, Comment } from '../types';

export default function PostDetailPage() {
  const { id } = useParams<{ id: string }>();

  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPostAndComments = async () => {
      if (!id) return;

      try {
        setLoading(true);
        setError(null);

        const stored = localStorage.getItem('localPosts');
        const localPosts: Post[] = stored ? JSON.parse(stored) : [];
        const localFound = localPosts.find((p) => String(p.id) === String(id));

        if (localFound) {
          setPost(localFound);
          setComments([]);
          return;
        }

        const postRes = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
        if (!postRes.ok) {
          throw new Error('Không tìm thấy bài viết');
        }
        const postData: Post = await postRes.json();
        setPost(postData);

        const commentsRes = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${id}/comments`
        );
        if (commentsRes.ok) {
          const commentsData: Comment[] = await commentsRes.json();
          setComments(commentsData);
        }
      } catch {
        setError('Không thể tải thông tin bài viết này.');
      } finally {
        setLoading(false);
      }
    };

    fetchPostAndComments();
  }, [id]);

  return (
    <div className="page-container">
      <div className="detail-actions-top">
        <Link to="/" className="btn-back">
          Quay lại danh sách
        </Link>
      </div>

      {loading && (
        <div className="status-message loading">
          <p>Đang tải chi tiết bài viết...</p>
        </div>
      )}

      {error && (
        <div className="status-message error">
          <p>{error}</p>
        </div>
      )}

      {!loading && !error && post && (
        <article className="post-detail-card">
          <span className="post-id">ID: #{post.id}</span>
          <h1 className="detail-title">{post.title}</h1>
          <div className="detail-body">
            <p>{post.body}</p>
          </div>

          <hr className="divider" />

          <section className="comments-section">
            <h2>Bình luận ({comments.length})</h2>

            {comments.length === 0 ? (
              <p className="no-comments">Chưa có bình luận nào cho bài viết này.</p>
            ) : (
              <div className="comment-list">
                {comments.map((comment) => (
                  <div key={comment.id} className="comment-item">
                    <p className="comment-author">
                      <strong>{comment.name}</strong> ({comment.email})
                    </p>
                    <p className="comment-body">{comment.body}</p>
                  </div>
                ))}
              </div>
            )}
          </section>
        </article>
      )}
    </div>
  );
}
