import React from 'react';
import type { DiaryData } from 'types/DiaryData';

import styles from './DiaryList.module.css';

type DiaryListProps = {
  diaries: Array<DiaryData>;
  loading: boolean;
  onSelect: (diary: DiaryData) => void;
};

export const DiaryList: React.FC<DiaryListProps> = ({
  diaries,
  loading,
  onSelect,
}) => {
  if (loading) {
    return <div>読み込み中...</div>;
  }

  if (diaries.length === 0) {
    return <div>日記がありません</div>;
  }

  return (
    <div className={styles.diaryListContainer}>
      <h2>日記一覧</h2>
      <div className={styles.diaryList}>
        {diaries.map((diary) => (
          <div
            key={diary.id}
            onClick={() => onSelect(diary)}
            className={styles.diaryItem}
          >
            {diary.title}
            <div className={styles.summary}>
              {diary.content?.slice(0, 20) ?? ''}...
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
