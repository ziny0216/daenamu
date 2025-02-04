export interface User {
  profile_img: string;
  nickname: string;
  is_anonymity?: boolean;
}

export interface ProfileProps {
  user: User;
}
