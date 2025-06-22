import { LoginForm } from '../components/LoginForm';
import styles from './Login.module.css';
import React from 'react';

export const Login = () => {
  return (
    <div className={styles.loginContainer}>
      <LoginForm />
    </div>
  );
};
