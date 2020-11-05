module.exports = {
  extends: 'react-app',
  plugins: ['graphql'],
  parser: 'babel-eslint',
  rules: {
    'graphql/template-strings': [
      'error',
      {
        env: 'apollo',
        schemaJson: require('./schema.json'),
      },
      {
        env: 'apollo',
        tagName: 'spaceql',
        schemaJson: require('./spacex.json'),
      },
    ],
  },
}
