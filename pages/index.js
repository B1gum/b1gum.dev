import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import { getSortedPostsData } from '../lib/posts';
import Link from 'next/link';
import Date from '../components/date';

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h1 className={utilStyles.headingLg}>Blog Posts</h1>

        {allPostsData.map(({ id, date, title, readingTime, excerpt }) => (
          <article key={id} className="mb-12">
            {/* 1. Wrap title + meta in our CSS-module grid */}
            <div className={utilStyles.postHeader}>
              <h3 className={utilStyles.postTitle}>
                <Link href={`/posts/${id}`}>{title}</Link>
              </h3>
              <div className={utilStyles.postMeta}>
                <Date dateString={date} /> &middot; {readingTime}
              </div>
            </div>

            {/* 2. Render your Markdown excerpt as HTML */}
            <div
              className={utilStyles.postExcerpt}
              dangerouslySetInnerHTML={{ __html: excerpt }}
            />
          </article>
        ))}
      </section>
    </Layout>
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
