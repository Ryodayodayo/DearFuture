import React, { useState, ChangeEvent } from 'react';

interface InputFieldProps {
    label: string;
    type?: string;
    name: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    error?: string;
}

export const InputField : React.FC<InputFieldProps> = ({ 
    label, 
    type, 
    name, 
    value, 
    onChange, 
    placeholder, 
    required = false,
    disabled,
    error 
}) => {
    return (
        <div>
        <label>
            {label}
            {required && <span>*</span>}
        </label>
        <input
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            disabled = {disabled}
        />
        {error && <p>{error}</p>}
        </div>
  );
};