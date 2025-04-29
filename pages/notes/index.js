import fs from 'fs';
import path from 'path';
import matter from 'gray-matter'
import Head from 'next/head';
import utilStyles from '../../styles/utils.module.css';
import Link from 'next/link'

// Read filenames out of public/notes at build time 
export async function getStaticProps() {
  const metaDir = path.join(process.cwd(), 'content', 'notes')
  const files = fs.readdirSync(metaDir).filter(f => f.endsWith('.md'))
  
  const notes = files.map(fileName => {
    const slug = fileName.replace(/\.md$/, '')
    const full = fs.readFileSync(path.join(metaDir, fileName), 'utf8')
    const { data } = matter(full)

    return {
      slug,
      pdfPath: `/notes/${slug}.pdf`,
      ...data
    }
  })

  notes.sort((a, b) => a.title.localeCompare(b.title))

  return { props: { notes } }
}

export default function NotesPage({ notes }) {
  return (
    <>
      <Head>
        <title>Lecture Notes</title>
      </Head>

      <section className={utilStyles.headingMd}>
        <h1 className={utilStyles.headingXl}>Lecture Notes</h1>
        <p className={utilStyles.lectureIntro}> Underneath you will find a selection of my lecture notes for a few different courses taught as part of the bachelor's degree in Mechanical Engineering at Aarhus University. If you are interested in the LaTeX source code for the notes these can be found over on{' '} <a href="https://github.com/B1gum">my GitHub</a> </p>
      </section>

      <section className={utilStyles.grid}>
        {notes.map(({ slug, title, description, type, language, pdfPath, studyYear, semester, ects}) => (
          <div key={slug} className={utilStyles.card}>
            <div className={utilStyles.postHeader}>
              <h3 className={utilStyles.cardTitle}>
                <Link href={pdfPath} download>
                {title}
                </Link>
                </h3>
              <div className={utilStyles.postMeta}>
                {language} &middot; {studyYear} &middot; {semester} &middot; {ects} ECTS &middot; {type}
              </div>
            </div>
            <p className={utilStyles.cardDescription}>{description}</p>
          </div>
        ))}
      </section>
    </>
  )
}
