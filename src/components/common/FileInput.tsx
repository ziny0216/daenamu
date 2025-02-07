'use client';

import styled from 'styled-components';
import { FileData, FileObjType, InputProps } from '@/types/components/common';
import { ChangeEvent, ElementType } from 'react';
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
  icon: Icon,
}: InputProps & {
  icon?: ElementType;
  handleFileChange: (file: FileData[]) => void;
}) {
  // 파일리더를 이용하여 파일 정보 읽기
  const getFileData = (file: File): Promise<FileObjType> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => resolve({ dataUrl: reader.result, file });
      reader.onerror = reject;

      reader.readAsDataURL(file);
    });
  };

  // 파일 선택
  const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files: FileList | null = e.target.files;
    if (!files) return;
    const promises = Array.from(files).map(file => getFileData(file));

    // 파일 비동기 처리
    Promise.all(promises)
      .then(results => {
        const filesDataUrls = results.map(result => result.dataUrl);
        const processedFiles = results.map(result => result.file);

        const filesArr = checkFileSize(processedFiles, 3);

        // 파일 미리보기 정보 구성
        const previewArr: FileData[] = filesArr.map(file => ({
          new_filepath: filesDataUrls[processedFiles.indexOf(file)],
          org_filename: file.name,
        }));
        e.target.value = '';
        if (handleFileChange) {
          handleFileChange(previewArr);
        }
      })
      .catch(error => {
        console.error('Error loading files: ', error);
      });
  };

  return (
    <StyledFileWrapper>
      <label htmlFor={id}>{Icon && <Icon />}</label>
      <StyledFileInput
        accept=".png,.jpg"
        type={type}
        onChange={onChange}
        id={id}
      />
    </StyledFileWrapper>
  );
}
