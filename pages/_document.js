import Document, { Head, Main, NextScript } from 'next/document'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import injectTapEventPlugin from 'react-tap-event-plugin'

// should fix "Warning: Unknown prop `onTouchTap` on <label> tag."
injectTapEventPlugin()

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
          <style dangerouslySetInnerHTML={{ __html: '' }} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
