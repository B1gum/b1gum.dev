import React from 'react'
import styles from './imageWithCaption.module.css'

type Props = {
  src: string
  alt: string
  caption: string
  style?: React.CSSProperties
}

export default function ImageWithCaption({
  src,
  alt,
  caption,
  style,
}: Props) {
  return (
    <figure className={styles.figure} style={style}>
      <img className={styles.img} src={src} alt={alt} />
      <figcaption className={styles.caption}>{caption}</figcaption>
    </figure>
  )
}

