import React, { ChangeEvent } from 'react';
import styles from "./DiaryTextField.module.css"

interface DiaryTextFieldProps {
    label?: string;
    name: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    error?: string;
    size?: 'sm' | 'md' | 'lg';
    variant?: 'default' | 'outlined' | 'filled';
}

export const DiaryTextField: React.FC< DiaryTextFieldProps > = ({
    label, 
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

    const textareaClassNames = [
        styles.input,
        styles[variant],
        styles[size],
        error ? styles.inputError : '',
        disabled ? styles.disabled : ''
    ].filter(Boolean).join(' ');

    return (
        <div>
            <textarea
                className={textareaClassNames}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                disabled={disabled}
            />
        </div>
    );
} 