import Document, { Head, Main, NextScript } from 'next/document'

import raw from '../css/raw'

export default class MyDocument extends Document {
  static async getInitialProps({ renderPage }) {
    const page = renderPage()
    return { ...page }
  }

  render() {
    return (
      <html lang="en">
        <Head>
          <title>My page</title>
          <style
            dangerouslySetInnerHTML={{ __html: raw }}
            />
          <link href="https://cdnjs.cloudflare.com/ajax/libs/normalize/5.0.0/normalize.min.css" rel="stylesheet" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
