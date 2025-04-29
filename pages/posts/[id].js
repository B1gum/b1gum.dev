import { getAllPostIds, getPostData } from '../../lib/posts';
import Link from 'next/link';
import Date from '../../components/date';
import utilStyles from '../../styles/utils.module.css';
import styles from '../../styles/post.module.css';

export default function Post({ postData }) {
  return (
    <div className={styles.postContainer}>
      <div className={styles.postHeader}>
        <Link href="/" className={styles.homeButton}>
          Home
        </Link>
        <div className={styles.meta}>
          <Date dateString={postData.date} /> • {postData.readingTime}
        </div>
      </div>
      <hr className={styles.divider} />

      <article className={utilStyles.article}>
        <h1 className={styles.postTitle}>{postData.title}</h1>
        <div
          className={styles.postText}
          dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
        />
      </article>
    </div>
  )
}


export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}
