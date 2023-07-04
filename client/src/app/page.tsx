import Image from "next/image";

import { Post } from "@/domains/models/Post";

import { FeedLayout } from "@/components/layout/FeedLayout/FeedLayout";

import { FeedPost } from "@/components/commons/FeedPost/FeedPost";

import styles from "./page.module.css";

async function getPosts(userId: number): Promise<Post[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/posts/${userId}`,
    {
      next: {
        tags: [`feed-posts-${userId}`],
        revalidate: 60,
      },
    }
  );

  return response.json();
}

export default async function Home() {
  const posts = await getPosts(1);

  return (
    <main className={styles.main}>
      <FeedLayout>
        <>
          {posts.map((post) => (
            <FeedPost key={post.id} post={post} />
          ))}
        </>

        <>comment</>
      </FeedLayout>
    </main>
  );
}
