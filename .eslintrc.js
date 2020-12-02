module.exports = {
  extends: 'react-app',
  plugins: ['graphql'],
  parser: 'babel-eslint',
  globals: {
    wait: 'readonly',
    render: 'readonly',
    mockedRender: 'readonly',
    ApolloMockedProvider: 'readonly',
    ApolloErrorProvider: 'readonly',
    ApolloLoadingProvider: 'readonly',
  },
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
    'react/jsx-no-undef': ['error', { allowGlobals: true }],
  },
}
