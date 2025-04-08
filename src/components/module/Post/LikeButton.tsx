'use client';

import Button from '@/components/common/Button';
import LikeOnIcon from '@/assets/icons/icon-like-on.svg';
import LikeOffIcon from '@/assets/icons/icon-like-off.svg';
import { useEffect, useState } from 'react';

export default function LikeButton({
  handleToggleLike,
  likeValue,
  likeCnt,
}: {
  handleToggleLike: (isLike: boolean) => void;
  likeValue: boolean;
  likeCnt: number;
}) {
  const [isLike, setIsLike] = useState(false);
  const [likeCount, setLikeCount] = useState(likeCnt);
  const toggleLike = () => {
    const nextLike = !isLike;
    setIsLike(nextLike);
    setLikeCount(prev => prev + (nextLike ? 1 : -1));
    handleToggleLike(nextLike); // 외부 서버 요청
  };

  useEffect(() => {
    setIsLike(likeValue);
  }, [likeValue]);
  return (
    <>
      <Button
        title={likeCount?.toString()}
        onClick={toggleLike}
        icon={isLike ? <LikeOnIcon /> : <LikeOffIcon />}
        isIcon
        color={'transparent'}
      />
    </>
  );
}
