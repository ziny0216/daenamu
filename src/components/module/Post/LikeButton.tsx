'use client';

import Button from '@/components/common/Button';
import LikeOnIcon from '@/assets/icons/icon-like-on.svg';
import LikeOffIcon from '@/assets/icons/icon-like-off.svg';
import { useState } from 'react';

export default function LikeButton() {
  const [isLike, setIsLike] = useState(false);
  const toggleLike = () => {
    setIsLike(!isLike);
  };
  return (
    <>
      <Button
        onClick={toggleLike}
        icon={isLike ? <LikeOnIcon /> : <LikeOffIcon />}
        isIcon
        color={'transparent'}
      />
    </>
  );
}
