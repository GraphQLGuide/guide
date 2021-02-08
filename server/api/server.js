export default (req, res) => {
  res.status(200).send(`
    <!doctype html>
    <html lang="en">
    
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
      <title>The GraphQL Guide</title>
    </head>
    
    <body>
      Server-side rendered: ${req.headers['user-agent']}
    </body>
    
    </html>
  `)
}
