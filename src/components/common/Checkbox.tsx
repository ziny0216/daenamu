'use client';

import styled from 'styled-components';
import { InputProps } from '@/types/components/common';

const StyledInputWrapper = styled.div`
  display: flex;
  gap: 4px;

  label {
    cursor: pointer;
    vertical-align: middle;

    &:before {
      content: '';
      display: block;
      width: 24px;
      height: 24px;
      flex: 0 0 24px;
      background-size: contain;
      vertical-align: middle;
      margin-right: 4px;
    }
  }
`;

const StyledCheckbox = styled.input<InputProps>`
  input {
    display: none;
  }

  input[type='checkbox']:checked + label:before {
    content: '';
    background-size: contain;
  }
`;

export default function Checkbox({ label, id, ...props }: InputProps) {
  return (
    <StyledInputWrapper>
      <StyledCheckbox id={id} type="checkbox" {...props} />
      {label && <label htmlFor={id}>{label}</label>}
    </StyledInputWrapper>
  );
}
