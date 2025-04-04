'use client';
import styled from 'styled-components';
import Input from '@/components/common/Input';
import SearchIcon from '@/assets/icons/icon-search.svg';
import { useRouter } from 'next/navigation';

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
  const handleClick = () => {
    router.push(`/search?keyword=${'ddd'}`);
  };
  return (
    <SearchBarWrapper>
      <StyledInput color={'bottomBorder'} placeholder={'검색어 입력'} />
      <StyledButton onClick={handleClick}>
        <SearchIcon width="16" height="16" />
      </StyledButton>
    </SearchBarWrapper>
  );
}
