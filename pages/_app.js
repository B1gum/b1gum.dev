import '../styles/global.css'
import { useRouter } from 'next/router'
import Layout from '../components/layout'

export default function App({ Component, pageProps }) {
  const { pathname } = useRouter()

  const isBlogIndex  = pathname === '/'
  const isNotesIndex = pathname === '/notes'
  const showLayout   = isBlogIndex || isNotesIndex

  if (showLayout) {
    return (
      <Layout home={true}>
        <Component {...pageProps} />
      </Layout>
    )
  }

  return <Component {...pageProps} />
}
