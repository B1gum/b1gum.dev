import { getAllPostIds } from '../lib/posts';
const SITE_URL = 'https://b1gum.dev';

function buildXml(urlPaths) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlPaths.map(p => `  <url><loc>${SITE_URL}${p}</loc></url>`).join('\n')}
</urlset>`;
}

export default function SiteMap() {
}

export async function getServerSideProps({ res }) {
  const postSlugs = getAllPostIds().map(({ params }) => params.id);

  const urls = [
    '/',
    '/posts',
    '/notes',
    ...postSlugs.map(id => `/posts/${id}`),
  ];

  res.setHeader('Content-Type', 'text/xml');
  res.write(buildXml(urls));
  res.end();

  return { props: {} };
}

