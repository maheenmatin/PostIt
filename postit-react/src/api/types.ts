export type VoteType = 'UPVOTE' | 'DOWNVOTE';

export interface VoteDto {
  voteType: VoteType;
  postId: number;
}

export interface PostRequest {
  postId?: number;
  communityName?: string;
  postName: string;
  url?: string;
  description?: string;
}

export interface PostResponse {
  postId: number;
  postName: string;
  url?: string;
  description?: string;
  userName: string;
  communityName: string;
  voteCount: number;
  commentCount: number;
  duration: string;
  upVote?: boolean;
  downVote?: boolean;
}

export interface CommunityDto {
  communityId: number;
  name: string;
  description: string;
  numberOfPosts: number;
}

export interface CommentsDto {
  commentId?: number;
  postId: number;
  createdDate?: string; // ISO date string
  text: string;
  userName?: string;
}

export interface RegisterRequest {
  email: string;
  username: string;
  password: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
  username: string;
}

export interface AuthenticationResponse {
  authenticationToken: string;
  refreshToken: string;
  expiresAt: string; // ISO date
  username: string;
}
