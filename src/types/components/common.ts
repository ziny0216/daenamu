import {
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
}

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  inputSize?: 'sm' | 'md';
}

export interface ButtonProps {
  className?: string;
  title?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  color?: 'default' | 'transparent';
  disabled?: boolean;
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
