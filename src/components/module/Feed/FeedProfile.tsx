import styles from '@/components/module/Feed/Feed.module.css';
import { Tables } from '@/types/database.types';
import Profile from '@/components/module/User/Profile';

export default function FeedProfile(userProfile: Tables<'users'>) {
  return (
    <div className={styles.feed_profile}>
      <Profile profile={userProfile} size={'lg'} />
      {userProfile.introduce && (
        <p className={styles.feed_introduce}>{userProfile.introduce}</p>
      )}
    </div>
  );
}
