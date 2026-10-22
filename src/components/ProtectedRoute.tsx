import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  isLoggedIn: boolean;
  children: ReactNode;
}

export default function ProtectedRoute({ isLoggedIn, children }: ProtectedRouteProps) {
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
