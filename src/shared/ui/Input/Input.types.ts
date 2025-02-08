import { InputHTMLAttributes } from 'react';

export type HTMLInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'value'
>;

export interface InputProps extends HTMLInputProps {
  className?: string;
  value?: string;
}
