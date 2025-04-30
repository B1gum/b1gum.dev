import Head from 'next/head';
import { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import { getSortedPostsData } from '../lib/posts';
import Link from 'next/link';
import Date from '../components/date';
import styles from '../styles/post.module.css'

export default function Home({ allPostsData }) {
  return (
    <>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h1 className={utilStyles.headingXl}>Blog Posts</h1>

        {allPostsData.map(({ id, date, title, readingTime, excerpt, series }) => (
          <article key={id} className="mb-12">
            <div className={utilStyles.postHeader}>
              <h3 className={utilStyles.postTitle}>
                <Link href={`/posts/${id}`}>{title}</Link>
              </h3>
              <div className={utilStyles.postMeta}>
                <Date dateString={date} /> &middot; {readingTime}
              </div>
            </div>

            {series && (
              <p className={styles.postSeries}>{series}</p>
            )}

            <div
              className={utilStyles.postExcerpt}
              dangerouslySetInnerHTML={{ __html: excerpt }}
            />
          </article>
        ))}
      </section>
    </>
  );
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}
