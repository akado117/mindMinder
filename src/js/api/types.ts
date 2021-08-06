export interface Profile {
  accountType: string;
  avatarUrl: string | null;
  bannerUrl: string | null;
  creatorType: string | null;
  created: string | null;
  description: string | null;
  gender: string | null;
  followerCount: number | null;
  followingCount: number | null;
  postCount: number | null;
  username: string;
}

export interface User {
  displayName: string
  email: string
  emailVerified: boolean
  isAnonymous: boolean
}