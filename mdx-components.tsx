import type { MDXComponents } from 'mdx/types'
import { AudioButton } from './components/audioButton';

export function useMDXComponents(components: MDXComponents) {
  return {
    AudioButton,
    ...components,
  }
}
