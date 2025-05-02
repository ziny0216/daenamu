import React, {
  ButtonHTMLAttributes,
  Dispatch,
  InputHTMLAttributes,
  ReactNode,
  SetStateAction,
  TextareaHTMLAttributes,
} from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  id?: string;
  color?: 'default' | 'bottomBorder' | 'dark';
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
  color?: 'default' | 'transparent' | 'foreground' | 'decoration' | 'warn';
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isIcon?: boolean;
  icon?: ReactNode;
}

export interface FileData {
  file?: File;
  image_url: string | null;
  id?: number;
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

export type TooltipState = {
  visible: boolean;
  list: DefaultObj[];
  position: { x: number; y: number };
};

export type TooltipContextType = {
  tooltipState: TooltipState;
  setTooltipState: Dispatch<SetStateAction<TooltipState>>;
  selectedItem: DefaultObj | null;
};
