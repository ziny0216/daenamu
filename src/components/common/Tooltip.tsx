import styled from 'styled-components';
import { DefaultObj } from '@/types/components/common';
import { useContext, useEffect, useRef } from 'react';
import { TooltipContext } from '@/components/provider/TooltipProvider';

const TooltipWrapper = styled.ul`
  padding: 8px 0;
  position: absolute;
  background-color: var(--default-700);
  z-index: 1;
  border-radius: 16px;
  min-width: 180px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow:
    0 6px 12px rgba(0, 0, 0, 0.12),
    0 4px 8px rgba(0, 0, 0, 0.08),
    0 0 4px rgba(0, 0, 0, 0.08);
`;

const StyledTooltipItem = styled.li`
  color: var(--default-100);
  padding: 8px;
  font-size: var(--font-size-sm);
  line-height: var(--line-height-sm);
  font-weight: var(--font-weight-m);
  transition: background-color 0.3s ease-in-out;
  cursor: pointer;

  &:hover {
    background-color: var(--default-600);
  }
`;

export default function Tooltip({
  toolTipList,
  position,
  onClick,
}: {
  toolTipList: DefaultObj[];
  position: {
    x: number;
    y: number;
  };
  onClick: (item: DefaultObj) => void;
}) {
  const tooltipRef = useRef<HTMLUListElement>(null);
  const { setTooltipState } = useTooltip();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      if (target?.closest('.tooltip_trigger')) return; // 버튼 동작과 겹치지 않게
      if (tooltipRef.current?.contains(target)) return; // 툴팁 내부 클릭은 무시

      setTooltipState(prev => ({ ...prev, visible: false }));
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [setTooltipState]);

  return (
    <TooltipWrapper
      ref={tooltipRef}
      style={{ top: position.y, left: position.x }}
    >
      {toolTipList.map(item => (
        <StyledTooltipItem onClick={() => onClick(item)} key={item.value}>
          {item.name}
        </StyledTooltipItem>
      ))}
    </TooltipWrapper>
  );
}

export const useTooltip = () => {
  const context = useContext(TooltipContext);
  if (!context) {
    throw new Error('useTooltip must be used within a TooltipProvider');
  }
  return context;
};
