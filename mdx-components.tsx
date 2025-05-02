import type { MDXComponents } from 'mdx/types'
import AudioButton from './components/audioButton';
import VolumeSlider from './components/volumeSlider';
import ImageWithCaption from './components/imageWithCaption';

export function useMDXComponents(components: MDXComponents) {
  return {
    AudioButton,
    VolumeSlider,
    ImageWithCaption,
    ...components,
  }
}
