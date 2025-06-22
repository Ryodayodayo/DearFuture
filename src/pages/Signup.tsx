import { SignupForm } from '../components/SignupForm';
import styles from './Signup.module.css';
import React from 'react';

export const Signup = () => {
  return (
    <div className={styles.signupContainer}>
      <SignupForm />
    </div>
  );
};
