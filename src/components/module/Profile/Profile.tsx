'use client';

import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import { ProfileProps } from '@/types/components/module';

const StyledProfile = styled.div.withConfig({
  shouldForwardProp: prop => prop !== 'is_anonymity',
})<{ is_anonymity?: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: ${props => (props.is_anonymity ? 'pointer' : 'default')};
  padding: 8px 0;

  img {
    border-radius: 50em;
    overflow: hidden;
  }

  .nickname {
    font-size: 14px;
    line-height: 20px;
    font-weight: 600;
  }
`;

export default function Profile({ user }: ProfileProps) {
  const router = useRouter();
  const handleProfileClick = () => {
    if (!user.is_anonymity) {
      router.push('/');
    }
  };
  return (
    <StyledProfile
      onClick={handleProfileClick}
      is_anonymity={user.is_anonymity}
    >
      <img src={user.profile_img} alt="유저 프로필" />
      <p className="nickname">{user.nickname}</p>
    </StyledProfile>
  );
}
