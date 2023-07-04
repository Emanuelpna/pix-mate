import styles from "./FeedLayout.module.css";

type FeedLayoutProps = {
  children: React.ReactNode[];
};

export function FeedLayout({ children }: FeedLayoutProps) {
  if (!children) return null;

  const FirstColumn = (children?.[0] as React.ReactElement) ?? null;
  const SecondColumn = (children?.[1] as React.ReactElement) ?? null;

  return (
    <section className={styles.wrapper}>
      <div className={styles.feedContainer}>{FirstColumn}</div>

      <div className={styles.commentsSidePanel}>{SecondColumn}</div>
    </section>
  );
}
