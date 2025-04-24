import styled from 'styled-components';
import { DefaultObj } from '@/types/components/common';

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

  &:hover {
    background-color: var(--default-600);
  }
`;

const mockData: DefaultObj[] = [
  { name: '좋아요한 글', value: 'post' },
  { name: '작성한 댓글', value: 'comment' },
];
export default function Tooltip() {
  return (
    <TooltipWrapper>
      {mockData.map(item => (
        <StyledTooltipItem key={item.value}>{item.name}</StyledTooltipItem>
      ))}
    </TooltipWrapper>
  );
}
