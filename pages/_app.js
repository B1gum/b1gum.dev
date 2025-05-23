import '../styles/global.css'
import { useRouter } from 'next/router'
import Layout from '../components/layout'
import { MDXProvider } from '@mdx-js/react'
import { useMDXComponents } from '../mdx-components'
import 'katex/dist/katex.min.css'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from "@vercel/speed-insights/next"

export default function App({ Component, pageProps }) {
  const { pathname } = useRouter()

  const isBlogIndex  = pathname === '/'
  const isNotesIndex = pathname === '/notes'
  const showLayout   = isBlogIndex || isNotesIndex

  const mdxComponents = useMDXComponents({})

  if (showLayout) {
    return (
      <MDXProvider components={mdxComponents}>
        <Layout home={true}>
          <Component {...pageProps} />
          <Analytics />
          <SpeedInsights/>
        </Layout>
     </MDXProvider>
    )
  }

  return (
    <MDXProvider components={mdxComponents}>
      <Component {...pageProps} />
      <Analytics />
      <SpeedInsights/>
    </MDXProvider>
  )
}
