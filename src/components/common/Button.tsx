'use client';

import styled from 'styled-components';
import { ButtonProps } from '@/types/components/common';

const btnSize = {
  xs: {
    padding: '4px 8px',
    lineHeight: 'var(--line-height-sm)',
    fontSize: 'var(--font-size-sm)',
  },
  sm: {
    padding: '8px 12px',
    lineHeight: 'var(--line-height-md)',
    fontSize: 'var(--font-size-md)',
  },
  md: {
    padding: '10px 16px',
    lineHeight: 'var(--line-height-md)',
    fontSize: 'var(--font-size-md)',
  },
  lg: {
    padding: '12px 24px',
    lineHeight: 'var(--line-height-lg)',
    fontSize: 'var(--font-size-lg)',
  },
};

const btnColor = {
  default: {
    backgroundColor: 'var(--default-200)',
    hover: {
      backgroundColor: 'var(--default-300)',
    },
  },
  transparent: {
    backgroundColor: 'transparent',
  },
};

const iconSize = {
  xs: {
    width: '24px',
    height: '24px',
  },
  sm: {
    width: '32px',
    height: '32px',
  },
  md: {
    width: '40px',
    height: '40px',
  },
  lg: {
    width: '48px',
    height: '48px',
  },
};

const StyledButton = styled('button').withConfig({
  shouldForwardProp: prop => prop !== 'isIcon',
})<ButtonProps>`
  color: var(--foreground);
  border-radius: var(--border-radius-sm);
  transition: background-color 0.3s ease-in-out;
  font-weight: var(--font-weight-m);

  ${({ size = 'xs', isIcon }) => (isIcon ? iconSize[size] : btnSize[size])}
  ${({ color = 'default' }) => btnColor[color]}
    &:disabled {
    opacity: var(--disable-opacity);
  }

  &:hover {
    ${({ color = 'default' }) =>
      color === 'transparent' ? null : btnColor[color]?.hover};
  }
`;

export default function Button({ icon: Icon, ...btn }: ButtonProps) {
  return (
    <StyledButton {...btn}>
      {Icon && <Icon />}
      {btn.title && <span>{btn.title}</span>}
    </StyledButton>
  );
}
