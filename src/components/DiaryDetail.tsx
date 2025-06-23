import React from 'react';
import styles from './DiaryDetail.module.css';

type DiaryDetailProps = {
  diary: {
    id: string;
    title: string;
    content?: string;
    mood?: string;
    createdAt?: string;
    updatedAt?: string;
  } | null;
};

export const DiaryDetail: React.FC<DiaryDetailProps> = ({ diary }) => {
  if (!diary) return null;

  const formattedDate = diary.createdAt
    ? new Date(diary.createdAt).toLocaleString('ja-JP', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      })
    : '';
  const updatedDate = diary.updatedAt
    ? new Date(diary.updatedAt).toLocaleString('ja-JP', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      })
    : '';
  return (
    <div className={styles.diaryDetailContainer}>
      <div className={styles.title}>{diary.title}</div>
      <div className={styles.content}>{diary.content}</div>
      <div className={styles.mood}>気分: {diary.mood}</div>
      <div className={styles.date}>作成日: {formattedDate}</div>
      <div className={styles.date}>更新日: {updatedDate}</div>
    </div>
  );
};
