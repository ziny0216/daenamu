'use client';
import styled from 'styled-components';
import { TextareaProps } from '@/types/components/common';

const textareaSizes = {
  sm: {
    fontSize: 'var(--font-size-sm)',
    lineHeight: 'var(--line-height-sm)',
  },
  md: {
    fontSize: 'var(--font-md)',
    lineHeight: 'var(--line-height-md)',
  },
};
const StyledTextareaWrapper = styled.div`
  border-radius: var(--border-radius-sm);
  background-color: var(--content1);
  color: var(--foreground);
  transition: background-color 0.3s ease-in-out;
  padding: 16px;
`;

const StyledTextarea = styled.textarea<{ $inputSize?: 'sm' | 'md' }>`
  background-color: var(--content1);
  color: var(--foreground);
  width: 100%;
  resize: none;
  padding-right: 8px;

  ${({ $inputSize = 'sm' }) => textareaSizes[$inputSize]}
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--default-100);
    border-radius: var(--border-radius-lg);
  }

  &::-webkit-scrollbar-track {
    background-color: var(--default-300);
    border-radius: var(--border-radius-lg);
  }
`;

export default function Textarea({ inputSize, ...props }: TextareaProps) {
  return (
    <StyledTextareaWrapper>
      <StyledTextarea $inputSize={inputSize} {...props} />
    </StyledTextareaWrapper>
  );
}
