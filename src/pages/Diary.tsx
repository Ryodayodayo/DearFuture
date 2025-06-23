import { DiaryCreate } from '../components/DiaryCreate';
import { Modal } from '../components/ui/Modal';
import React, { useState } from 'react';
import { DiaryList } from '../components/DiaryList';
import { Button } from '../components/ui/Button';
import styles from './Diary.module.css';

export const Diary = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <div className={styles.buttonContainer}>
        <Button onClick={() => setIsModalOpen(true)} size="md" variant="third">
          日記を作成
        </Button>
      </div>
      <div className={styles.container}>
        <DiaryList />
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <DiaryCreate />
        </Modal>
      </div>
    </div>
  );
};
