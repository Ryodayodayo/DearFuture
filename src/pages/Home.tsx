import React from 'react';
import styles from './Home.module.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const Home = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  return (
    <div className={styles.homeContainer}>
      <h1 className={styles.title}>DearFuture</h1>
      <p className={styles.catchcopy}>あなたの毎日を未来へつなぐ日記アプリ</p>
      <section className={styles.section}>
        <h2>アプリの特徴</h2>
        <ul>
          <li>毎日の出来事や気持ちを簡単に記録</li>
          <li>気分やタイトルで日記を検索</li>
          <li>自分だけのプライベート日記</li>
        </ul>
      </section>
      <section className={styles.section}>
        <h2>使い方</h2>
        <ol>
          <li>新規登録またはログイン</li>
          <li>「日記を作成」ボタンから日記を書く</li>
          <li>一覧から過去の日記を見返す</li>
        </ol>
      </section>
      <div className={styles.navigateGroup}>
        {currentUser ? (
          <button onClick={() => navigate('/diarypage')}>日記ページへ</button>
        ) : (
          <>
            <button onClick={() => navigate('/signup')}>新規登録</button>
            <button onClick={() => navigate('/login')}>ログイン</button>
          </>
        )}
      </div>
    </div>
  );
};
