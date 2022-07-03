import { TrainingModel, TrainingSession } from "./train"

export type User = {
  username: string;
  bio: string;
  profileURL: string | null;
  creationTime: number;
  followers: number;
  following: number;
  posts: number;
  admin: boolean;
  bannedUntil: number;
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
  likes: number;
};

export type Comment = {
  author: string;
  body: string;
  date: number;
  childIDs: string[];
  parentID: string | null;
};

export type Report = {
  userId: string;
  reportedPostId: string;
  reportedUserId: string;
  reason: string;
  reportTime: number;
};
