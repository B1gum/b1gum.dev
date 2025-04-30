import createMDX from '@next/mdx'
import remarkMath  from 'remark-math'
import rehypeKatex from 'rehype-katex'

const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
}

export default createMDX({
  extension: /\.(md|mdx)$/,
  options: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
  },
})(nextConfig)
