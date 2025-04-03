'use client';

import styled from 'styled-components';
import { ProfileProps } from '@/types/components/module';
import Image from 'next/image';
import DefaultPf from '@/assets/icons/default-pf.svg';

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
  cursor: ${props => (props.is_anonymity ? 'default' : 'pointer')};
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
  size = 'md',
  className,
  is_anonymity = false,
  profile,
  handleUserProfile,
}: ProfileProps) {
  return (
    <StyledProfile
      onClick={handleUserProfile}
      className={className}
      size={size}
      is_anonymity={is_anonymity}
    >
      <StyledImageBox size={size}>
        {profile?.avatar_url ? (
          <Image
            fill
            sizes="30"
            style={{ objectFit: 'cover', borderRadius: '50em' }}
            src={profile?.avatar_url}
            alt="유저 이미지"
          />
        ) : (
          <DefaultPf width={30} height={30} />
        )}
      </StyledImageBox>
      <p className="nickname">{profile?.nickname}</p>
    </StyledProfile>
  );
}
