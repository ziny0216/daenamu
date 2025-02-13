'use client';

import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import { ProfileProps } from '@/types/components/module';

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
  ${({ size = 'md' }) => profileSizes[size]}
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50em;
    overflow: hidden;
  }
`;
export default function Profile({ user, size = 'md' }: ProfileProps) {
  const router = useRouter();
  const handleProfileClick = () => {
    //  익명이 아닐때 해당 글쓴이 피드로
    console.log(user.is_anonymity, 'user.is_anonymity');
    if (!user.is_anonymity) {
      router.push('/feed/1');
    }
  };
  return (
    <StyledProfile
      size={size}
      onClick={handleProfileClick}
      is_anonymity={user.is_anonymity}
    >
      <StyledImageBox size={size}>
        <img src={user.profile_img} alt="유저 프로필" />
      </StyledImageBox>
      <p className="nickname">{user.nickname}</p>
    </StyledProfile>
  );
}
