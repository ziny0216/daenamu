import {
  ButtonHTMLAttributes,
  ElementType,
  InputHTMLAttributes,
  ReactNode,
  TextareaHTMLAttributes,
} from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  id?: string;
  color?: 'default' | 'bottomBorder';
  inputSize?: 'sm' | 'md';
  isButton?: boolean;
  children?: ReactNode;
}

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  inputSize?: 'sm' | 'md';
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  title?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  borderradius?: 'lg' | 'md';
  color?: 'default' | 'transparent' | 'foreground';
  onClick?: () => void;
  isIcon?: boolean;
  icon?: ElementType;
  children?: ReactNode;
}

export interface FileObjType {
  dataUrl: string | ArrayBuffer | null;
  file: File;
}

export interface FileData {
  new_filepath: string | ArrayBuffer | null;
  org_filename: string;
  file_seq?: number;
}

export interface FileDelete {
  file_seq: number | null;
  idx: number;
}

export interface DefaultObj {
  name: string;
  value: string;
}

export interface FormErrors {
  [key: string]: string | undefined;
}
