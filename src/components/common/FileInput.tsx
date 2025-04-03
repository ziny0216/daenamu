'use client';

import styled from 'styled-components';
import { FileData, InputProps } from '@/types/components/common';
import { ChangeEvent, ReactNode } from 'react';
import { checkFileSize } from '@/utils/validation';

const StyledFileWrapper = styled.div`
  label {
    cursor: pointer;
  }
`;

const StyledFileInput = styled.input`
  display: none;
`;
export default function FileInput({
  type = 'file',
  id,
  handleFileChange,
  className,
  icon,
}: InputProps & {
  className?: string;
  icon?: ReactNode;
  handleFileChange: (file: FileData[]) => void;
}) {
  // 파일 선택
  const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files: FileList | null = e.target.files;
    if (!files) return;

    const processedFiles = Array.from(files);
    const filesArr = checkFileSize(processedFiles, 3);
    //파일 미리보기 정보 구성
    const previewArr: FileData[] = filesArr.map(file => ({
      image_url: URL.createObjectURL(file),
      file: file,
    }));
    e.target.value = '';
    if (handleFileChange) {
      handleFileChange(previewArr);
    }
  };

  return (
    <StyledFileWrapper className={className}>
      <label htmlFor={id}>{icon}</label>
      <StyledFileInput
        accept=".png,.jpg"
        type={type}
        onChange={onChange}
        id={id}
      />
    </StyledFileWrapper>
  );
}
