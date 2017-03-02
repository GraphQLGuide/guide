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
          <link rel="shortcut icon" href="/static/favicon/favicon.ico" />
          <link rel="icon" sizes="16x16 32x32 64x64" href="/static/favicon/favicon.ico" />
          <link rel="icon" type="image/png" sizes="196x196" href="/static/favicon/favicon-192.png" />
          <link rel="icon" type="image/png" sizes="160x160" href="/static/favicon/favicon-160.png" />
          <link rel="icon" type="image/png" sizes="96x96" href="/static/favicon/favicon-96.png" />
          <link rel="icon" type="image/png" sizes="64x64" href="/static/favicon/favicon-64.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/static/favicon/favicon-32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/static/favicon/favicon-16.png" />
          <link rel="apple-touch-icon" href="/static/favicon/favicon-57.png" />
          <link rel="apple-touch-icon" sizes="114x114" href="/static/favicon/favicon-114.png" />
          <link rel="apple-touch-icon" sizes="72x72" href="/static/favicon/favicon-72.png" />
          <link rel="apple-touch-icon" sizes="144x144" href="/static/favicon/favicon-144.png" />
          <link rel="apple-touch-icon" sizes="60x60" href="/static/favicon/favicon-60.png" />
          <link rel="apple-touch-icon" sizes="120x120" href="/static/favicon/favicon-120.png" />
          <link rel="apple-touch-icon" sizes="76x76" href="/static/favicon/favicon-76.png" />
          <link rel="apple-touch-icon" sizes="152x152" href="/static/favicon/favicon-152.png" />
          <link rel="apple-touch-icon" sizes="180x180" href="/static/favicon/favicon-180.png" />
          <meta name="msapplication-TileColor" content="#FFFFFF" />
          <meta name="msapplication-TileImage" content="/static/favicon/favicon-144.png" />
          <meta name="msapplication-config" content="/static/browserconfig.xml" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
