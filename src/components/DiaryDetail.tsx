import React from 'react';
import styles from './DiaryDetail.module.css';

interface DiaryDetailProps {
  diary: {
    id: string;
    title: string;
    content?: string;
    mood?: string;
  } | null;
}

export const DiaryDetail: React.FC<DiaryDetailProps> = ({ diary }) => {
  if (!diary) return null;

  return (
    <div className={styles.diaryDetailContainer}>
      <div className={styles.title}>{diary.title}</div>
      <div className={styles.content}>{diary.content}</div>
      <div className={styles.mood}>気分: {diary.mood}</div>
    </div>
  );
};
