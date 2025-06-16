import React, { useState, ChangeEvent } from 'react';

interface InputFieldProps {
  label: string;
  type?: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
}

const InputField : React.FC<InputFieldProps> = ({ 
  label, 
  type = 'text', 
  name, 
  value, 
  onChange, 
  placeholder, 
  required = false,
  error 
}) => {
  return (
    <div>
      <label>
        {label}
        {required && <span>*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
      />
      {error && <p>{error}</p>}
    </div>
  );
};