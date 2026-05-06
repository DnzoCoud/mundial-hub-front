// src/components/InputWithIcon.tsx
import React from 'react';

interface Props {
  name: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon: React.ReactNode;
  error?: string;
  helperText?: string;
}

const InputWithIcon: React.FC<Props> = ({
  name,
  type,
  placeholder,
  value,
  onChange,
  icon,
  error,
  helperText,
}) => {
  return (
    <div style={{ marginBottom: '15px' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#f8f9fa',
          border: '1px solid #ddd',
          borderRadius: '5px',
          padding: '10px',
        }}
      >
        <span style={{ marginRight: '10px', color: '#6c757d' }}>{icon}</span>
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          style={{
            border: 'none',
            background: 'transparent',
            flex: 1,
            outline: 'none',
            color: '#333',
            fontSize: '18px',
          }}
        />
      </div>
      {error && <span style={{ color: 'red', fontSize: '17px' }}>{error}</span>}
      {helperText && !error && (
        <span style={{ color: '#6c757d', fontSize: '15px', display: 'block', marginTop: '4px', fontFamily: 'Inter, sans-serif' }}>
          {helperText}
        </span>
      )}
    </div>
  );
};

export default InputWithIcon;