import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="page-container notfound-container">
      <div className="notfound-card">
        <h1>404</h1>
        <h2>Không Tìm Thấy Trang</h2>
        <p>Đường dẫn bạn đang truy cập không tồn tại.</p>
        <Link to="/" className="btn-primary">
          Quay lại trang chủ
        </Link>
      </div>
    </div>
  );
}
