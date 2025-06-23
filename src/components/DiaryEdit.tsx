import React, { useState } from 'react';
import { DiaryTextField } from './ui/DiaryTextField';
import { useDb } from '../contexts/DbContext';
import { DiaryData } from '../types/DiaryData';
import styles from './DiaryEdit.module.css';
import { useAuth } from '../contexts/AuthContext';

type DiaryEditProps = {
  diary: DiaryData;
  onSaved?: () => void;
};

export const DiaryEdit: React.FC<DiaryEditProps> = ({ diary, onSaved }) => {
  const { updateDocument } = useDb();
  const { currentUser } = useAuth();
  const [formData, setFormData] = useState({
    title: diary.title || '',
    content: diary.content || '',
    mood: diary.mood || '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);

  const handleChange =
    (field: string) => (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));

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
        alert('ユーザー情報が取得できません。再ログインしてください。');
        return;
      }
      setLoading(true);
      try {
        const updatedData = {
          ...formData,
          updatedAt: new Date().toISOString(),
        };
        await updateDocument(
          `users/${currentUser.uid}/diaries`,
          diary.id,
          updatedData,
        );
        alert('日記を更新しました！');
        if (onSaved) onSaved();
      } catch (e) {
        alert('日記の更新に失敗しました');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className={styles.diaryEditContainer}>
      <h1>日記を編集</h1>
      <DiaryTextField
        label="タイトル"
        name="title"
        value={formData.title}
        onChange={handleChange('title')}
        placeholder="タイトル"
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
          placeholder="内容"
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
          placeholder="気分"
          required={true}
          error={errors.mood}
          size="sm"
        />
      </div>
      <button
        onClick={handleSubmit}
        className={styles.submitButton}
        disabled={loading}
      >
        {loading ? '保存中...' : '上書き保存'}
      </button>
    </div>
  );
};
