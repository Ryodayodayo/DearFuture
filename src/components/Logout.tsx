import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export const Logout = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { logout } = useAuth();

  const handleLogout = async () => {
    setLoading(true);

    try {
      await logout();
      console.log('ログアウト完了');
      alert('ログアウトしました');
    } catch (error: unknown) {
      console.error('ログアウトエラー:', error);
      setError('ログアウトに失敗しました');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={handleLogout} disabled={loading}>
        {loading ? 'ログアウト中...' : 'ログアウト'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};
