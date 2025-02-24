'use client';

import styled from 'styled-components';
import { ProfileProps } from '@/types/components/module';
import useProfileInfo from '@/hooks/user/useProfileInfo';
import Image from 'next/image';

const profileSizes = {
  md: {
    width: '30px',
    height: '30px',
    fontSize: 'var(--font-size-sm)',
    lineHeight: 'var(--line-height-sm)',
  },
  lg: {
    width: '80px',
    height: '80px',
    fontSize: 'var(--font-size-lg)',
    lineHeight: 'var(--line-height-lg)',
  },
};

const StyledProfile = styled.div.withConfig({
  shouldForwardProp: prop => prop !== 'is_anonymity',
})<{ is_anonymity?: boolean; size: 'md' | 'lg' }>`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: ${props => (props.is_anonymity ? 'pointer' : 'default')};
  padding: 8px 0;

  .nickname {
    font-weight: var(--font-weight-bold);
    font-size: ${({ size }) => profileSizes[size].fontSize};
    line-height: ${({ size }) => profileSizes[size].lineHeight};
  }
`;

const StyledImageBox = styled.div<{ size: 'md' | 'lg' }>`
  position: relative;
  border-radius: 50em;
  overflow: hidden;
  ${({ size = 'md' }) => profileSizes[size]}
`;
export default function Profile({
  user_id,
  size = 'md',
  className,
  is_anonymity = false,
}: ProfileProps) {
  const { profile } = useProfileInfo({ user_id });

  return (
    <StyledProfile
      className={className}
      size={size}
      is_anonymity={is_anonymity}
    >
      <StyledImageBox size={size}>
        <Image
          src={
            profile?.avatar_url
              ? profile?.avatar_url
              : 'https://picsum.photos/32/32'
          }
          alt="유저 프로필"
          fill
          style={{ objectFit: 'cover', borderRadius: '50em' }}
        />
      </StyledImageBox>
      <p className="nickname">{profile?.nickname}</p>
    </StyledProfile>
  );
}
