import '../styles/index.scss'
import { useEffect } from 'react';

export default function MyApp({ Component, pageProps }) {

  useEffect(() => {
    document.body.classList.remove('css-transitions-only-after-page-load');
  });

  return <Component {...pageProps} />
}
