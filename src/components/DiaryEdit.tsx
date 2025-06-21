import React, { useState } from 'react';
import { DiaryTextField } from './ui/DiaryTextField';
import { useDb } from '../contexts/DbContext';
import { useAuth } from '../contexts/AuthContext'; 

export const DiaryEdit = () => {
    const { addDocument } = useDb();
    const { currentUser } = useAuth();
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        mood: ''
    });
    const [errors, setErrors] = useState<{[key: string]: string}>({});

    const handleChange = (field: string) => (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setFormData(prev => ({
            ...prev,
            [field]: e.target.value
        }));
        
        // エラーをクリア
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const handleSubmit = async () => {
        const newErrors: {[key: string]: string} = {};
        
        if (!formData.title) newErrors.title = 'タイトルは必須です';
        if (!formData.content) newErrors.content = '内容は必須です';
        
        setErrors(newErrors);
        
        if (Object.keys(newErrors).length === 0) {
            if (!currentUser) {
                alert("ログインしてください");
                return;
            }
            try {
                await addDocument(`users/${currentUser.uid}/diaries`, formData); // コレクション名は"diaries"例
                alert("日記を保存しました！");
                setFormData({ title: '', content: '', mood: '' }); // フォームリセット
            } catch (e) {
                alert("日記の保存に失敗しました");
            }
        }
    };

    return (
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '20px' }}>
            <h1>今日の日記</h1>
            
            <DiaryTextField
                label="タイトル"
                name="title"
                value={formData.title}
                onChange={handleChange("title")}
                placeholder="今日のタイトル"
                required={true}
                error={errors.title}
                size="sm"
            />
            
            <div style={{ marginTop: '20px' }}>
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
            
            <div style={{ marginTop: '20px' }}>
                <DiaryTextField
                    label="今日の気分"
                    name="mood"
                    value={formData.mood}
                    onChange={handleChange('mood')}
                    placeholder="今日の気分を一言で表すと？"
                    variant="filled"
                    size="sm"
                />
            </div>
            
            <button 
                onClick={handleSubmit}
                style={{ 
                    marginTop: '30px', 
                    padding: '12px 24px',
                    backgroundColor: '#8b5a3c',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer'
                }}
            >
                日記を保存
            </button>
        </div>
    );
};