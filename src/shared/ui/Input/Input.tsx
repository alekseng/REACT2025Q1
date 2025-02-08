import { memo } from 'react';
import cls from './input.module.scss';
import { InputProps } from './Input.types.ts';

export const Input = memo((props: InputProps) => {
  const { className, value, placeholder, ...otherProps } = props;

  return (
    <input
      className={`${cls.input} ${className}`}
      value={value}
      placeholder={placeholder}
      type="text"
      {...otherProps}
    />
  );
});

Input.displayName = 'Input';
