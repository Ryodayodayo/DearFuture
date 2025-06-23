import React, { useState, useCallback, useEffect } from 'react';
import type { DiaryData } from 'types/DiaryData';
import { DiaryEdit } from 'components/DiaryEdit';
import { DiaryDetail } from 'components/DiaryDetail';
import { useAuth } from 'contexts/AuthContext';
import { useDb } from 'contexts/DbContext';
import { Button } from 'components/ui/Button';
import { DiaryList } from 'components/DiaryList';
import { Modal } from 'components/ui/Modal';
import { DiaryCreate } from 'components/DiaryCreate';

import styles from './Diary.module.css';

export const Diary = () => {
  const { getCollection } = useDb();
  const { currentUser } = useAuth();
  const [diaries, setDiaries] = useState<Array<DiaryData>>([]);
  const [isLoading, setLoading] = useState(true);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedDiary, setSelectedDiary] = useState<DiaryData | null>(null);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const fetchDiaries = useCallback(async () => {
    if (!currentUser) {
      return;
    }
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
    fetchDiaries();
  }, [fetchDiaries]);

  const handleSelectDiary = (diary: DiaryData) => {
    setSelectedDiary(diary);
    setIsDetailModalOpen(true);
    setIsEditMode(false);
  };

  const handleEditSaved = () => {
    setIsEditMode(false);
    setIsDetailModalOpen(false);
    setSelectedDiary(null);
    fetchDiaries();
  };

  const handleCreateDiary = () => {
    setIsCreateModalOpen(false);
    fetchDiaries();
  };

  return (
    <div>
      <div className={styles.buttonContainer}>
        <Button
          onClick={() => setIsCreateModalOpen(true)}
          size="md"
          variant="third"
        >
          日記を作成
        </Button>
      </div>
      <div className={styles.container}>
        <DiaryList
          diaries={diaries}
          loading={isLoading}
          onSelect={handleSelectDiary}
        />
        <Modal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
        >
          <DiaryCreate onCreated={handleCreateDiary} />
        </Modal>

        <Modal
          isOpen={isDetailModalOpen}
          onClose={() => setIsDetailModalOpen(false)}
        >
          {selectedDiary && !isEditMode && (
            <div>
              <div className={styles.diaryDetailContent}>
                <DiaryDetail diary={selectedDiary} />
              </div>
              <Button
                size="sm"
                variant="secondary"
                onClick={() => setIsEditMode(true)}
              >
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
  );
};
