import React from 'react';
import classNames from 'classnames';

import styles from './Button.module.css';

type ButtonProps = {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  variant?: 'primary' | 'secondary' | 'third';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
};

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'md',
  disabled = false,
}) => {
  const btnClass = classNames([
    styles.button,
    styles[variant],
    styles[size],
    disabled ? styles.disabled : '',
  ]);

  return (
    <button type={type} onClick={onClick} className={btnClass}>
      {children}
    </button>
  );
};
