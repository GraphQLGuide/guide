import auth0 from 'auth0-js'
import {
  initAuthHelpers,
  login as auth0Login,
  logout as auth0Logout,
} from 'auth0-helpers'
import { makeVar } from '@apollo/client'

import { apollo } from './apollo'

const client = new auth0.WebAuth({
  domain: 'graphql.auth0.com',
  clientID: '8fErnZoF3hbzQ2AbMYu5xcS0aVNzQ0PC',
  responseType: 'token',
  audience: 'https://api.graphql.guide',
  scope: 'openid profile guide',
})

initAuthHelpers({
  client,
  usePopup: true,
  authOptions: {
    connection: 'github',
    owp: true,
    popupOptions: { height: 623 }, // make tall enough for content
  },
  checkSessionOptions: {
    redirect_uri: window.location.origin,
  },
  onError: (e) => console.error(e),
})

export const loginInProgressVar = makeVar(false)

export const login = () => {
  loginInProgressVar(true)

  auth0Login({
    onCompleted: (e) => {
      loginInProgressVar(false)
      if (e) {
        console.error(e)
        return
      }

      apollo.reFetchObservableQueries()
    },
  })
}

export const logout = () => {
  auth0Logout()
  apollo.resetStore()
}
