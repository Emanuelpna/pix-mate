import Image from "next/image";

import { Post } from "@/domains/models/Post";

import styles from "./FeedPost.module.css";

type FeedPostProps = {
  post: Post;
};

export function FeedPost({ post }: FeedPostProps) {
  return (
    <article className={styles.wrapper}>
      <Image
        className={styles.photo}
        width={1200}
        height={1200}
        alt={`Post - ${post.owner.name}`}
        src={`${process.env.NEXT_PUBLIC_API_URL}${post.endpoint}`}
      />

      <header>
        <div>
          <p>{post.owner.name}</p>
          <p>@{post.owner.username}</p>
        </div>

        <div>{post.likes.length} Likes</div>
      </header>
    </article>
  );
}
