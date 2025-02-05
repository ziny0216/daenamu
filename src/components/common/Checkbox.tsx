'use client';

import styled from 'styled-components';
import { InputProps } from '@/types/components/common';
import CheckboxOn from '@/assets/icons/icon-check-on.svg'; // 체크된 아이콘
import CheckboxOff from '@/assets/icons/icon-check-off.svg';
import { ChangeEvent } from 'react';

const StyledInputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const StyledCheckbox = styled.input<InputProps>`
  visibility: hidden;
  width: 0;
  height: 0;
  position: absolute;
`;

export default function Checkbox({ label, id, checked, onChange }: InputProps) {
  const handleCheckBox = () => {
    if (onChange) {
      onChange({
        target: { checked: !checked },
      } as ChangeEvent<HTMLInputElement>);
    }
  };
  return (
    <StyledInputWrapper>
      <StyledCheckbox
        id={id}
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
      <div onClick={handleCheckBox}>
        {checked ? <CheckboxOn /> : <CheckboxOff />}
      </div>
      {label && (
        <label htmlFor={id}>
          {label} {checked}
        </label>
      )}
    </StyledInputWrapper>
  );
}
