'use client';

import styled from 'styled-components';
import { InputProps } from '@/types/components/common';

const StyledInputWrapper = styled.div`
  label {
    cursor: pointer;
    vertical-align: middle;
    display: flex;
    align-items: center;

    &:before {
      content: '';
      display: block;
      width: 24px;
      height: 24px;
      border: 2px solid var(--default-700);
      vertical-align: middle;
      margin-right: 4px;
    }
  }
`;

const StyledCheckbox = styled.input<InputProps>`
  display: none;

  &:checked + label:before {
    content: '';
  }
`;

export default function Checkbox({ label, id, checked, onChange }: InputProps) {
  return (
    <StyledInputWrapper>
      <StyledCheckbox
        id={id}
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
      {label && <label htmlFor={id}>{label}</label>}
    </StyledInputWrapper>
  );
}
