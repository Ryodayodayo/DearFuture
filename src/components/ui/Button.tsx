import React, { useState, ChangeEvent } from 'react';
import styles from "./Button.module.css"

interface ButtonProps{
    children : React.ReactNode; 
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    variant? :  'primary' | 'secondary';
    size? : 'sm' | 'md' | 'lg';
    disabled? : boolean;
    type?: 'button' | 'submit' | 'reset';
}

export const Button :React.FC<ButtonProps> = ({ 
    children, 
    onClick, 
    type = 'button', 
    variant = 'primary',
    size = 'md',
    disabled = false,
}) => {
  const classNames = [
    styles.button,
    styles[variant],
    styles[size],
    disabled ? styles.disabled : '' //disabled === trueの時だけ適用
  ].filter(Boolean).join(' '); //classNameはstringを期待するため、undefindや空文字をfilterして""で結合する
    

  return (
    <button
      type={type}
      onClick={onClick}
      className = {classNames}
    >
      {children}
    </button>
  );
};
