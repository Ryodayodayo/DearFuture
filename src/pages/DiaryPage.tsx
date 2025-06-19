import React, { useState } from 'react';
import { DiaryTextField } from '../components/ui/DiaryTextField';

export const DiaryPage = () => {
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

    const handleSubmit = () => {
        const newErrors: {[key: string]: string} = {};
        
        if (!formData.title) newErrors.title = 'タイトルは必須です';
        if (!formData.content) newErrors.content = '内容は必須です';
        
        setErrors(newErrors);
        
        if (Object.keys(newErrors).length === 0) {
            // 保存処理
            console.log('日記を保存:', formData);
        }
    };

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
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
            
            <div style={{ marginTop: '20px' }}>
                <DiaryTextField
                    label="日記の内容"
                    name="content"
                    value={formData.content}
                    onChange={handleChange('content')}
                    placeholder="今日はどんな一日でしたか？思い出や感じたことを自由に書いてください"
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