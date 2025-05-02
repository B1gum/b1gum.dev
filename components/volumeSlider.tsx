import React, { useState, useEffect } from 'react'
import styles from './volumeSlider.module.css'

const SESSION_KEY = 'volume-level'

interface VolumeSliderProps {
  vertical?: boolean
}

const VolumeSlider: React.FC<VolumeSliderProps> = ({ vertical = false }) => {
  const [volume, setVolume] = useState(0.5)

  useEffect(() => {
    const stored = sessionStorage.getItem(SESSION_KEY)
    const initial = stored != null ? parseFloat(stored) : 1
    setVolume(initial)
    applyVolume(initial)
  }, [])

  useEffect(() => {
    sessionStorage.setItem(SESSION_KEY, volume.toString())
    applyVolume(volume)
  }, [volume])

  const applyVolume = (vol: number) => {
    document.querySelectorAll<HTMLAudioElement>('audio')
      .forEach(a => { a.volume = vol })
  }

  if (!vertical) {
    return (
      <div className={styles.container}>
        <label htmlFor="volume-slider" className={styles.label}>🔊</label>
        <input
          id="volume-slider"
          type="range"
          min="0" max="1" step="0.01"
          value={volume}
          onChange={e => setVolume(parseFloat(e.target.value))}
          className={styles.slider}
        />
      </div>
    )
  }

  return (
    <div className={styles.verticalContainer}>
      <input
        id="volume-slider"
        type="range"
        min="0" max="1" step="0.01"
        value={volume}
        onChange={e => setVolume(parseFloat(e.target.value))}
        className={styles.sliderVertical}
      />
      <svg
        className={styles.labelVertical}
        viewBox="0 0 12 24"
        aria-hidden="true"
      >
        <path fill="#663300" d="M3 9v6h4l5 5V4L7 9H3z" />
      </svg>
    </div>
  )
}

export default VolumeSlider

