'use client';

import styled from 'styled-components';
import { useRouter } from 'next/navigation';

interface User {
  profile_img: string;
  nickname: string;
  is_anonymity?: boolean;
}

interface StyledProfileProps {
  user: User;
}

const Profile = styled.div.withConfig({
  shouldForwardProp: prop => prop !== 'is_anonymity',
})<{ is_anonymity?: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: ${props => (props.is_anonymity ? 'pointer' : 'default')};

  img {
    border-radius: 50em;
    overflow: hidden;
  }

  .nickname {
    font-size: 14px;
    line-height: 20px;
    font-weight: 500;
  }
`;

export default function StyledProfile({ user }: StyledProfileProps) {
  const router = useRouter();
  const handleProfileClick = () => {
    if (!user.is_anonymity) {
      router.push('/');
    }
  };
  return (
    <Profile onClick={handleProfileClick} is_anonymity={user.is_anonymity}>
      <img src={user.profile_img} alt="유저 프로필" />
      <p className="nickname">{user.nickname}</p>
    </Profile>
  );
}
