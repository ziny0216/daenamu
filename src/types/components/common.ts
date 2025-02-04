import { InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  id?: string;
  color?: 'default';
  inputSize?: 'sm' | 'md';
  isButton?: boolean;
}

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

export interface ButtonProps {
  title?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  color?: 'default' | 'transparent';
  disabled?: boolean;
  onClick?: () => void;
  isIcon?: boolean;
  children?: ReactNode;
}
