import React, { useState } from 'react';
import { DiaryTextField } from './ui/DiaryTextField';
import { useDb } from '../contexts/DbContext';
import { useAuth } from '../contexts/AuthContext';
import styles from './DiaryCreate.module.css';

export const DiaryCreate = () => {
  const { addDocument } = useDb();
  const { currentUser } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    mood: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange =
    (field: string) => (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));

      // エラーをクリア
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: '' }));
      }
    };

  const handleSubmit = async () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.title) newErrors.title = 'タイトルは必須です';
    if (!formData.content) newErrors.content = '内容は必須です';
    if (!formData.mood) newErrors.mood = '気分は必須です';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      if (!currentUser) {
        alert('ログインしてください');
        return;
      }
      try {
        const diaryData = {
          ...formData,
          createdAt: new Date().toISOString(),
        };
        await addDocument(`users/${currentUser.uid}/diaries`, diaryData);
        alert('日記を保存しました！');
        setFormData({ title: '', content: '', mood: '' });
      } catch (e) {
        alert('日記の保存に失敗しました');
      }
    }
  };

  return (
    <div className={styles.diaryEditContainer}>
      <h1>今日の日記</h1>

      <DiaryTextField
        label="タイトル"
        name="title"
        value={formData.title}
        onChange={handleChange('title')}
        placeholder="今日のタイトル"
        required={true}
        error={errors.title}
        size="sm"
      />

      <div className={styles.textFieldContainer}>
        <DiaryTextField
          label="日記の内容"
          name="content"
          value={formData.content}
          onChange={handleChange('content')}
          placeholder="今日はどんな一日でしたか？"
          required={true}
          error={errors.content}
          size="lg"
        />
      </div>

      <div className={styles.textFieldContainer}>
        <DiaryTextField
          label="今日の気分"
          name="mood"
          value={formData.mood}
          onChange={handleChange('mood')}
          placeholder="今日の気分を一言で表すと？"
          required={true}
          error={errors.mood}
          size="sm"
        />
      </div>

      <button onClick={handleSubmit} className={styles.submitButton}>
        日記を保存
      </button>
    </div>
  );
};
