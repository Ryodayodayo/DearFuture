import React from "react";

interface DiaryDetailProps {
  diary: {
    id: string;
    title: string;
    content?: string;
    mood?: string;
  } | null;
}

export const DiaryDetail: React.FC<DiaryDetailProps> = ({ diary}) => {
  if (!diary) return null;

  return (
    <div style={{ marginTop: "24px", padding: "16px", border: "1px solid #ccc", borderRadius: "8px" }}>
      <h3>{diary.title}</h3>
      <div>内容: {diary.content}</div>
      <div>気分: {diary.mood}</div>
    </div>
  );
};