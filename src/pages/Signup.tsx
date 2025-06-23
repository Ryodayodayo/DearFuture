import React from 'react';

import styles from './Signup.module.css';

import { SignupForm } from '@/components/SignupForm';

export const Signup = () => {
  return (
    <div className={styles.signupContainer}>
      <SignupForm />
    </div>
  );
};
