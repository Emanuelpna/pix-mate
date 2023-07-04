import { Post } from "./Post";
import { User } from "./User";

export type PostComment = {
  id: number;
  description: string;
  replyTo: Post;
  owner: User;
  likes: User[];
  createdAt: Date;
  updatedAt: Date;
};
