'use client';

import FeedProfile from '@/components/module/Feed/FeedProfile';
import styles from '@/components/module/Feed/Feed.module.css';
import { usePostList } from '@/hooks/post/usePostList';
import PostItem from '@/components/module/Post/PostItem';
import { useEffect, useState } from 'react';
import { Tables } from '@/types/database.types';
import browserClient from '@/utils/supabaseClient';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { useRouter } from 'next/navigation';

export default function FeedList({ feedId }: { feedId: string }) {
  const router = useRouter();
  const [feedProfile, setFeedProfile] = useState<Tables<'users'> | null>(null);
  const userProfile = useSelector((state: RootState) => state.user.users);
  useEffect(() => {
    const fetchFeedProfile = async () => {
      const { data, error } = await browserClient
        .from('users')
        .select('*')
        .eq('id', feedId)
        .single();

      if (error) {
        console.error('피드 사용자 정보 불러오기 실패:', error);
        return;
      }

      setFeedProfile(data);
    };

    fetchFeedProfile();
  }, [feedId]);

  const isMyFeed = feedId === userProfile.id;

  const { postList } = usePostList({
    userProfile,
    sortType: 'recent',
    only_mine: isMyFeed,
    target_user_id: isMyFeed ? undefined : feedId,
  });

  return (
    <div className={styles.feed_container}>
      {feedProfile && <FeedProfile {...feedProfile} />}

      <div className={styles.feed_list}>
        {postList.map(post => (
          <PostItem
            key={post.id}
            type={'list'}
            post={post}
            viewerId={feedProfile?.id}
          />
        ))}
      </div>
    </div>
  );
}
