import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'components/ui/Button';
import { useAuth } from 'contexts/AuthContext';

import styles from './Home.module.css';

export const Home = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  return (
    <div className={styles.homeContainer}>
      <h1 className={styles.title}>DearFuture</h1>
      <p className={styles.catchcopy}>未来の自分から手紙が届く</p>
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
          <Button
            onClick={() => navigate('/diarypage')}
            size="lg"
            variant="third"
          >
            日記ページへ
          </Button>
        ) : (
          <>
            <Button
              onClick={() => navigate('/signup')}
              size="lg"
              variant="third"
            >
              新規登録
            </Button>
            <Button
              onClick={() => navigate('/login')}
              size="lg"
              variant="third"
            >
              ログイン
            </Button>
          </>
        )}
      </div>
    </div>
  );
};
