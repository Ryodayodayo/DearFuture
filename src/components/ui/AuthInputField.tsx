import React, { ChangeEvent } from 'react';
import classNames from 'classnames';
import styles from './AuthInputField.module.css';

interface AuthInputFieldProps {
    label: string;
    type?: string;
    name: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    error?: string;
    size?: 'sm' | 'md' | 'lg';
    variant?: 'default' | 'outlined' | 'filled';
}

export const AuthInputField: React.FC<AuthInputFieldProps> = ({ 
    label, 
    type = "text",
    name, 
    value, 
    onChange, 
    placeholder, 
    required = false,
    disabled = false,
    error,
    size = 'md',
    variant = 'default'
}) => {
    const inputClassNames = classNames ([
        styles.input,
        styles[variant],
        styles[size],
        error ? styles.inputError : '',
        disabled ? styles.disabled : ''
    ]);

    return (
        <div className={styles.formGroup}>
            <label className={styles.label}>
                {label}
                {required && <span className={styles.required}>*</span>}
            </label>
            <input
                className={inputClassNames}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                disabled={disabled}
            />
            {error && <p className={styles.error}>{error}</p>}
        </div>
    );
};