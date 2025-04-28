import Head from 'next/head';
import Image from 'next/image';
import Script from 'next/script';

import styles from './layout.module.css';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';
import { FaLinkedin, FaGithub, FaTwitter, FaEnvelope } from "react-icons/fa"
export const soMeSize = 28; 

import TabMenu from "./tabMenu"

export const name = "Noah Rahbek Bigum Hansen"
export const siteTitle = 'Home | B1gum.dev';

export default function Layout({ children, home }) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Personal blog detailing all the little projects i am working on. Audio Engineering. Mechanical Engineering. Programming."
        />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle,
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.zeit.co%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <Script
        src="https://connect.facebook.net/en_US/sdk.js"
        strategy="lazyOnload"
        onLoad={() =>
          console.log(`script loaded correctly, window.FB has been populated`)
        }
      />
      <header className={styles.header}>
        {home ? (
          <>
            <Image
              priority
              src="/images/profile.jpg"
              className={utilStyles.borderCircle}
              height={96}
              width={96}
              alt={name}
            />
            <h1 className={utilStyles.headingSm}>{name}</h1>

            <div className={styles.socialLinks}>
              <a
                href="https://www.linkedin.com/in/noahrbhansen/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin size={soMeSize} />
              </a>
              <a
                href="https://github.com/b1gum"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub size={soMeSize} />
              </a>
              <a
                href="https://twitter.com/h4ns3mand"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitter size={soMeSize} />
              </a>
              <a href="mailto:noahrahbighansen@gmail.com">
                <FaEnvelope size={soMeSize} />
              </a>
            </div>
            <p className={styles.description}>
              Mechanical Engineering student at Aarhus University. Interested in vim, software development and guitar pedals.
            </p>
          </>
        ) : (
          <>
            <Link href="/">
              <Image
                priority
                src="/images/profile.jpg"
                className={utilStyles.borderCircle}
                height={96}
                width={96}
                alt={name}
              />
            </Link>
            <h2 className={utilStyles.headingLg}>
              <Link href="/" className={utilStyles.colorInherit}>
                {name}
              </Link>
            </h2>
          </>
        )}
        
        <TabMenu />

      </header>

      <main>{children}</main>
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">← Back to home</Link>
        </div>
      )}
    </div>
  );
}
