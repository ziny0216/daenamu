'use client';
import styled from 'styled-components';
import { InputProps } from '@/types/components/common';

const inputSizes = {
  sm: {
    padding: '6px 12px',
    fontSize: 'var(--font-size-sm)',
    lineHeight: 'var(--line-height-sm)',
  },
  md: {
    padding: '8px 12px',
    fontSize: 'var(--font-md)',
    lineHeight: 'var(--line-height-md)',
  },
};

const inputColor = {
  default: {
    border: '1px solid var(--default-200)',
    backgroundColor: 'var(--background-color)',
  },
  bottomBorder: {
    borderRadius: 0,
    borderBottom: '1px solid var(--default-200)',
    backgroundColor: 'var(--background-color)',
  },
};

const StyledInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  label {
    font-size: var(--font-size-xs);
    line-height: var(--line-height-xs);
  }
`;

const StyledInput = styled.input<InputProps>`
  color: var(--foreground);
  border-radius: var(--border-radius-sm);
  transition: background-color 0.3s ease-in-out;
  min-width: 250px;
  ${({ inputSize = 'sm', isButton }) =>
    isButton ? inputSizes[inputSize] : inputSizes[inputSize]}
  ${({ color = 'default' }) => inputColor[color]}
`;

export default function Input({
  label,
  id,
  type = 'text',
  ...props
}: InputProps) {
  return (
    <StyledInputWrapper>
      {label && <label htmlFor={id}>{label}</label>}
      <StyledInput id={id} type={type} {...props} />
    </StyledInputWrapper>
  );
}
