"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import styles from "./tabMenu.module.css"

export default function TabMenu() {
  const pathname = usePathname() || "/"
  const isNotes = pathname.startsWith("/notes")

  return (
    <nav className={styles.tabMenu}>
      <Link href="/" className={isNotes ? '' : styles.active}>
        Blog Posts
      </Link>
      <Link href="/notes" className={isNotes ? styles.active : ''}>
        Lecture Notes
      </Link>
    </nav>
  )
}
