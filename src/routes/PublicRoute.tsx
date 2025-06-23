import { Navigate } from 'react-router-dom';
import React from 'react';
import { useAuth } from 'contexts/AuthContext';

type PublicRouteProps = {
  children: React.ReactNode;
};

export const PublicRoute = ({ children }: PublicRouteProps) => {
  const { currentUser, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return currentUser ? <Navigate to="/diarypage" /> : <div>{children}</div>;
};
