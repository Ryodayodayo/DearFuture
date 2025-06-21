import React, { useEffect, useState } from "react";
import { useDb } from "../contexts/DbContext";
import { useAuth } from "../contexts/AuthContext";
import { DiaryDetail } from "./DiaryDetail";
import { Modal } from "./ui/Modal";
import styles from "./DiaryList.module.css";

interface Diary {
  id: string;
  title: string;
content?: string;
}

export const DiaryList = () => {
  const { getCollection } = useDb();
  const { currentUser } = useAuth();
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDiary, setSelectedDiary] = useState<Diary | null>(null);

  useEffect(() => {
    const fetchDiaries = async () => {
      if (!currentUser) return;
      setLoading(true);
      try {
        const data = await getCollection(`users/${currentUser.uid}/diaries`);
        setDiaries(data);
      } catch (e) {
        alert("日記の取得に失敗しました");
      } finally {
        setLoading(false);
      }
    };
    fetchDiaries();
  }, [currentUser, getCollection]);

  const handleSelect = (diaryId: string) => {
    const diary = diaries.find(d => d.id === diaryId) || null;
    setSelectedDiary(diary);
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
                <div key={diary.id} onClick={() => handleSelect(diary.id)} className={styles.diaryItem}>
                    {diary.title}
                    <div className={styles.summary}>
                        {diary.content?.slice(0, 20) ?? ""}...
                    </div>
                </div>
                ))}
            </div>
            <div className={styles.diaryDetailContainer}>
                <Modal isOpen={!!selectedDiary} onClose={() => setSelectedDiary(null)}>
                    {selectedDiary && (
                    <DiaryDetail
                        diary={selectedDiary}
                    />
                    )}
                </Modal>
            </div>
        </div>
    </div>
  );
};