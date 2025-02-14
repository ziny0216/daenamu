import styled from 'styled-components';
import { DefaultObj } from '@/types/components/common';
import { useState } from 'react';

const StyledTabWrapper = styled.div`
  padding: 4px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const StyledTabButton = styled.button`
  padding: 4px 12px;
  width: auto;
  color: var(--default-500);
  position: relative;
  transition: color 0.3s ease-in-out;
  font-size: var(--font-size-md);
  line-height: var(--line-height-md);

  &:after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 2px;
    background-color: var(--foreground);
    transition: width 0.3s ease-in-out;
  }

  &.active {
    color: var(--foreground);

    &:after {
      width: 100%;
    }
  }
`;

export default function TabList({
  tabList,
  onChange,
}: {
  tabList: DefaultObj[];
  onChange: (value: string) => void;
}) {
  const [currentTab, setCurrentTab] = useState(tabList[0].value);

  const handleTabClick = (value: string) => {
    setCurrentTab(value);
    onChange(value);
  };

  return (
    <StyledTabWrapper>
      {tabList.map(tab => (
        <StyledTabButton
          className={currentTab === tab.value ? 'active' : ''}
          key={tab.value}
          onClick={() => handleTabClick(tab.value)}
        >
          {tab.name}
        </StyledTabButton>
      ))}
    </StyledTabWrapper>
  );
}
