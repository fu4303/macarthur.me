import Document, { Html, Head, Main, NextScript } from 'next/document'
import { GA_TRACKING_ID } from '../lib/ga';
export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <title>Alex MacArthur // Web Developer in Nashville</title>
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}>
          </script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
