'use client';
import styled from 'styled-components';
import Input from '@/components/common/Input';
import SearchIcon from '@/assets/icons/icon-search.svg';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useState } from 'react';

const SearchBarWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  position: relative;
`;

const StyledInput = styled(Input)`
  padding-right: 40px;
`;

const StyledButton = styled.button`
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
`;

export default function SearchBar() {
  const router = useRouter();
  const [keyword, setKeyword] = useState('');
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleClick();
    }
  };
  const handleClick = () => {
    router.push(`/search?keyword=${keyword}`);
  };
  return (
    <SearchBarWrapper>
      <StyledInput
        onChange={onChange}
        color={'bottomBorder'}
        placeholder={'검색어 입력'}
        onKeyDown={onKeyDown}
      />
      <StyledButton onClick={handleClick}>
        <SearchIcon width="16" height="16" />
      </StyledButton>
    </SearchBarWrapper>
  );
}
