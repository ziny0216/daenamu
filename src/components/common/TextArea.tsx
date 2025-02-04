'use client';
import styled from 'styled-components';
import { TextareaProps } from '@/types/components/common';

const StyledTextarea = styled.textarea`
  border-radius: var(--border-radius-sm);
  background-color: var(--content1);
  color: var(--foreground);
  min-height: 100px;
  transition: background-color 0.3s ease-in-out;
  padding: 8px 12px;
  font-size: var(--font-size-md);
  line-height: var(--line-height-md);
  resize: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export default function Textarea(textarea: TextareaProps) {
  return <StyledTextarea {...textarea} />;
}
