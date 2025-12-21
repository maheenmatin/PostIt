export interface PostModel {
  postId: number;
  postName: string;
  url?: string;
  description?: string;
  userName: string;
  communityName: string;
  voteCount: number;
  commentCount: number;
  duration: string;
  upVote: boolean;
  downVote: boolean;
}
