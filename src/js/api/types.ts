import { fb } from './firebase'

export interface Profile {
  accountType: string;
  avatarUrl: string | null;
  creatorType: string | null;
  description: string | null;
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