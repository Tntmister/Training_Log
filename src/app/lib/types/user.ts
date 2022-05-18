import { TrainingModel, TrainingSession } from "./train"

export type User = {
  username: string;
  bio: string;
  profileURL: string | null;
  creationTime: number;
  followers: number;
  following: number;
  posts: number;
};

export type Follow = {
  dateFollowed: number;
  id: string;
  mutual: boolean;
};

export type Post = {
  authorComment: string;
  author: string;
  post: TrainingModel | TrainingSession;
  postId: string;
};
