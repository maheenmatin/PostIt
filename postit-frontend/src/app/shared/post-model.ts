export interface PostModel {
  postId: number;
  postName: string;
  description?: string;
  userName: string;
  communityName: string;
  voteCount: number;
  commentCount: number;
  duration: string;
  upVote: boolean;
  downVote: boolean;
}
