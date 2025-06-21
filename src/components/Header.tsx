import React from 'react';
import styles from "./Header.module.css"
import { useAuth } from "../contexts/AuthContext" 
import { useNavigate } from "react-router-dom"
import { Logout } from "./Logout"

export const Header = () => {

  const { currentUser } = useAuth();
  const navigate = useNavigate();

  return (
    <div className={styles.header}>
      <h1 className = {styles.title} onClick={() => navigate("/")}>
        DearFuture
      </h1>
      {currentUser ? (
        <Logout />
      ) : (
        <button className={styles.button} onClick={() => navigate("/login")}>
          ログイン
        </button>
      )}
    </div>
  );
};
