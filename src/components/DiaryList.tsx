import React, { useEffect, useState, useCallback } from 'react';
import { useDb } from '../contexts/DbContext';
import { useAuth } from '../contexts/AuthContext';
import { DiaryDetail } from './DiaryDetail';
import { Modal } from './ui/Modal';
import { DiaryEdit } from './DiaryEdit';
import { Button } from './ui/Button';
import styles from './DiaryList.module.css';

type Diary = {
  id: string;
  title: string;
  content?: string;
};

export const DiaryList = () => {
  const { getCollection } = useDb();
  const { currentUser } = useAuth();
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDiary, setSelectedDiary] = useState<Diary | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const fetchDiaries = useCallback(async () => {
    if (!currentUser) return;
    setLoading(true);
    try {
      const data = await getCollection(`users/${currentUser.uid}/diaries`);
      setDiaries(data);
    } catch (e) {
      alert('日記の取得に失敗しました');
    } finally {
      setLoading(false);
    }
  }, [currentUser, getCollection]);

  useEffect(() => {
    if (!currentUser) return;
    setDiaries([]);
    setSelectedDiary(null);
    setIsEditMode(false);
    setLoading(true);
    // 日記の取得
    fetchDiaries();
  }, [currentUser, fetchDiaries]);

  const handleSelect = (diaryId: string) => {
    const diary = diaries.find((d) => d.id === diaryId) || null;
    setSelectedDiary(diary);
    setIsEditMode(false);
    setLoading(false);
  };

  const handleEditSaved = () => {
    setIsEditMode(false);
    setSelectedDiary(null);
    fetchDiaries();
    setLoading(false);
  };

  if (!currentUser) {
    return <div>ログインしてください</div>;
  }

  if (loading) {
    return <div>読み込み中...</div>;
  }

  if (diaries.length === 0) {
    return <div>日記がありません</div>;
  }

  return (
    <div className={styles.diaryListContainer}>
      <div className={styles.diaryListWrapper}>
        <h2>日記一覧</h2>
        <div className={styles.diaryList}>
          {diaries.map((diary) => (
            <div
              key={diary.id}
              onClick={() => handleSelect(diary.id)}
              className={styles.diaryItem}
            >
              {diary.title}
              <div className={styles.summary}>
                {diary.content?.slice(0, 20) ?? ''}...
              </div>
            </div>
          ))}
        </div>
        <div className={styles.diaryDetailContainer}>
          <Modal
            isOpen={!!selectedDiary}
            onClose={() => setSelectedDiary(null)}
          >
            {selectedDiary && !isEditMode && (
              <div>
                <DiaryDetail diary={selectedDiary} />
                <Button variant="primary" onClick={() => setIsEditMode(true)}>
                  編集
                </Button>
              </div>
            )}
            {selectedDiary && isEditMode && (
              <DiaryEdit diary={selectedDiary} onSaved={handleEditSaved} />
            )}
          </Modal>
        </div>
      </div>
    </div>
  );
};
