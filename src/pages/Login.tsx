import React from 'react';

import styles from './Login.module.css';

import { LoginForm } from '@/components/LoginForm';

export const Login = () => {
  return (
    <div className={styles.loginContainer}>
      <LoginForm />
    </div>
  );
};
