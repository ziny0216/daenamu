import { toast } from 'react-toastify';

export const checkFileSize = (files: File[], maxSize: number) => {
  const maxBytes = maxSize * 1024 * 1024;
  const validFiles = files.filter(file => file.size <= maxBytes);
  if (validFiles.length !== files.length) {
    toast(
      `파일 크기는 최대 ${maxSize}MB 이어야 합니다. 크기가 초과된 파일은 제외되었습니다.`,
    );
  }
  return validFiles;
};
