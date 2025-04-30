import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import remarkExternalLinks from 'remark-external-links';
import readingTime from 'reading-time';

const postsDirectory = path.join(process.cwd(), 'posts');

export async function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = await Promise.all(
    fileNames.map(async (fileName) => {
    // Remove ".mdx" from file name to get id
    const id = fileName.replace(/\.(md|mdx)$/, '');

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Estimate read time 
    const { text: readingTimeText } = readingTime(matterResult.content)

    // Build a ~80 word excerpt
    const rawExcerpt = matterResult.content
      .trim()
      .split(/\s+/)
      .slice(0, 80)
      .join(' ')
      .concat('...')

    const excerpt = await serialize(rawExcerpt, {
      mdxOptions: {
        remarkPlugins: [],
        rehypePlugins: [],
      },
    });

    // Combine the data with the id
    return {
      id,
      readingTime: readingTimeText,
      excerpt,
      ...matterResult.data,
    };
    })
  );
  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllPostIds() {
  const fileNames = fs
    .readdirSync(postsDirectory)
    .filter(name => name.match(/\.(md|mdx)$/))
  
  return fileNames.map(fileName => ({
    params: {
      id: fileName.replace(/\.(md|mdx)$/, ''),
    },
  }));
}


export async function getPostData(id) {
  // Try both .mdx and .md
  const mdxPath = path.join(postsDirectory, `${id}.mdx`);
  const mdPath  = path.join(postsDirectory, `${id}.md`);
  const fullPath = fs.existsSync(mdxPath) ? mdxPath : mdPath;
  const source = fs.readFileSync(fullPath, 'utf8');

  const { content, data } = matter(source);
  const { text: readingTimeText } = readingTime(content);

  // Serialize MDX → renderable object, preserving raw HTML
  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [
        [remarkExternalLinks, { target: '_blank', rel: ['noopener', 'noreferrer'] }]
      ],
      rehypePlugins: [],
    },
  });

  return {
    id,
    mdxSource,
    readingTime: readingTimeText,
    ...data,
  };
}
