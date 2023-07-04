import { User } from "./User";
import { PostComment } from "./PostComment";

export type Post = {
  id: number;
  endpoint: string;
  description: string;
  owner: User;
  replys: PostComment[];
  likes: User[];
  createdAt: Date;
  updatedAt: Date;
};
