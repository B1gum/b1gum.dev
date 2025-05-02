import React, { useState, useRef, useEffect } from 'react'
import { interpolateAll } from 'flubber'
import styles from './audioButton.module.css'

// SVG paths for play/pause morph
const LEFT_HALF  = 'M8,5 L13.5,8.5 L13.5,15.5 L8,19 Z'
const RIGHT_HALF = 'M19,12 L13.5,15.5 L13.5,8.5 Z'
const BAR1 = 'M6,5 H10 V19 H6 Z'
const BAR2 = 'M14,5 H18 V19 H14 Z'


export default function AudioButton({
  src,
  label,
}: {
  src: string
  label?: string
}) {
  const audioRef    = useRef<HTMLAudioElement>(null)
  const morphers    = useRef<ReturnType<typeof interpolateAll> | null>(null)
  const [playing, setPlaying]       = useState(false)
  const [pathD,   setPathD]         = useState(`${LEFT_HALF} ${RIGHT_HALF}`)
  const [dashOffset, setDashOffset] = useState(0)

  // prepare the two flubber interpolators
  useEffect(() => {
    morphers.current = interpolateAll(
      [LEFT_HALF, RIGHT_HALF],
      [BAR1,      BAR2],
      { maxSegmentLength: 0.5 }
    )
  }, [])

  // update the ring’s dash-offset on timeupdate / loadedmetadata
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    const update = () => {
      const { duration=0, currentTime=0 } = audio
      const remaining = Math.max(duration - currentTime, 0)
      const frac = duration ? remaining / duration : 0
      const R = 40, C = 2 * Math.PI * R
      setDashOffset(C * (1 - frac))
    }
    audio.addEventListener('timeupdate', update)
    audio.addEventListener('loadedmetadata', update)
    return () => {
      audio.removeEventListener('timeupdate', update)
      audio.removeEventListener('loadedmetadata', update)
    }
  }, [])

  // animate the play↔pause morph
  useEffect(() => {
    if (!morphers.current) return
    const [fnL, fnR] = morphers.current
    const start = performance.now()
    const D = 300
    const step = now => {
      const t = Math.min((now - start) / D, 1)
      const f = playing ? t : 1 - t
      setPathD(`${fnL(f)} ${fnR(f)}`)
      if (t < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [playing])

  const toggle = () => {
    const a = audioRef.current
    if (!a) return
    if (playing) a.pause()
    else         a.play()
    setPlaying(!playing)
  }

  return (
    <div className={styles.container}>
      <audio hidden ref={audioRef} src={src} />
      <svg
        className={styles.button}
        viewBox="0 0 100 100"
        onClick={toggle}
      >
        <circle
          className={styles.ring}
          cx="50" cy="50" r="40"
          strokeDashoffset={dashOffset}
        />
        <g transform="translate(50 50) scale(2.75) translate(-12 -12)">
          <path
            className={styles.icon}
            d={pathD}
          />
        </g>
      </svg>
      {label && <span className={styles.label}>{label}</span>}
    </div>
  )
}

