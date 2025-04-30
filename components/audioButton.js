import React from 'react';
import styles from './audioButton.module.css';

const AudioButton = ({ src, label, className }) => {
  const audioRef = React.useRef(null);
  const [isPlaying, setIsPlaying] = React.useState(false);

  const handlePlayPause = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className={`${styles['audio-button']} ${className}`}>
      <button
        onClick={handlePlayPause}
        className={`${styles['play-pause-btn']} ${isPlaying ? 'playing' : ''}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="40"
          height="40"
          className={styles['icon']}
        >
          <path 
            className={isPlaying ? styles['pause-path'] : styles['play-path']}
            fill="brown"
            d="M6 4H8V20H6zM10 4H12V20H10z" /* Default Play Path */
          />
        </svg>
      </button>
      <audio ref={audioRef} src={src} preload="auto" />
    </div>
  );
};

export default AudioButton;

