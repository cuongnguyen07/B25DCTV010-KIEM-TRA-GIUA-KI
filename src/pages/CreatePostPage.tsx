import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Post } from '../types';

export default function CreatePostPage() {
  const [title, setTitle] = useState<string>('');
  const [body, setBody] = useState<string>('');
  const [errors, setErrors] = useState<{ title?: string; body?: string }>({});

  const navigate = useNavigate();

  const validate = (): boolean => {
    const errs: { title?: string; body?: string } = {};

    if (!title.trim()) {
      errs.title = 'Tiêu đề không được để trống.';
    } else if (title.trim().length < 5) {
      errs.title = 'Tiêu đề phải từ 5 ký tự trở lên.';
    }

    if (!body.trim()) {
      errs.body = 'Nội dung không được để trống.';
    } else if (body.trim().length < 10) {
      errs.body = 'Nội dung phải từ 10 ký tự trở lên.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    const newPost: Post = {
      id: Date.now(),
      title: title.trim(),
      body: body.trim(),
      userId: 1,
    };

    const stored = localStorage.getItem('localPosts');
    const localPosts: Post[] = stored ? JSON.parse(stored) : [];
    localStorage.setItem('localPosts', JSON.stringify([newPost, ...localPosts]));

    alert('Đăng bài viết mới thành công!');
    navigate('/');
  };

  return (
    <div className="page-container form-container">
      <div className="form-card">
        <h2>Viết bài mới</h2>

        <form onSubmit={handleSubmit} className="post-form">
          <div className="form-group">
            <label htmlFor="post-title">Tiêu đề bài viết</label>
            <input
              id="post-title"
              type="text"
              placeholder="Nhập tiêu đề..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={errors.title ? 'input-error' : ''}
            />
            {errors.title && <span className="field-error">{errors.title}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="post-body">Nội dung bài viết</label>
            <textarea
              id="post-body"
              rows={6}
              placeholder="Nhập nội dung bài viết..."
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className={errors.body ? 'input-error' : ''}
            />
            {errors.body && <span className="field-error">{errors.body}</span>}
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-primary">
              Đăng bài
            </button>
            <button
              type="button"
              className="btn-secondary"
              onClick={() => navigate('/')}
            >
              Huỷ
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
