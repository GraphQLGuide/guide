import Document, { Head, Main, NextScript } from 'next/document'

import { fontFamily, color } from '../lib/styles'

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
            dangerouslySetInnerHTML={{ __html: `
            body {
              font-family: ${fontFamily};
              color: #333;
              font-size: 18px;
              line-height: 1.7;
            }

            @media screen and (max-width: 760px) {
              body {
                font-size: 16px;
              }
            }

            a {
              color: ${color};
              text-decoration: none;
            }

            a:hover {
              text-decoration: underline;
            }
            ` }}
            />
          <link href="https://cdnjs.cloudflare.com/ajax/libs/normalize/5.0.0/normalize.min.css" rel="stylesheet" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
