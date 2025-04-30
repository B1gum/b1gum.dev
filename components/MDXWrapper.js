import { MDXProvider } from '@mdx-js/react';
import AudioButton from './audioButton';

const components = {
  AudioButton,
};

const MDXWrapper = ({ children }) => {
  return (
    <MDXProvider components={components}>
      {children}
    </MDXProvider>
  );
};

export default MDXWrapper
