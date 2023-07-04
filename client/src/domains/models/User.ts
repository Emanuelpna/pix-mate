import { Post } from "./Post";
import { PostComment } from "./PostComment";

export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  website: string;
  bio: string;
  feed: Post[];
  comments: PostComment[];
  createdAt: Date;
  updatedAt: Date;
};
