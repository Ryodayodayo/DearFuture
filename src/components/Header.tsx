import React from 'react';
import styles from './Header.module.css';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Logout } from './Logout';
import { Button } from './ui/Button';

export const Header = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  return (
    <div className={styles.header}>
      <h1 className={styles.title} onClick={() => navigate('/')}>
        DearFuture
      </h1>
      {currentUser ? (
        <Logout />
      ) : (
        <Button size="md" variant="third" onClick={() => navigate('/login')}>
          ログイン
        </Button>
      )}
    </div>
  );
};
