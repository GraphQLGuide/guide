import React, { useEffect } from 'react'
import { withRouter } from 'react-router'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import './Unsubscribe.css'

const UNSUBSCRIBE = gql`
  mutation Unsubscribe($token: String!) {
    unsubscribe(token: $token)
  }
`

const Unsubscribe = ({ match }) => {
  const [unsubscribe, { data }] = useMutation(UNSUBSCRIBE)
  useEffect(() => {
    unsubscribe({ variables: { token: match.params.token } })
  }, [])

  let message = 'Unsubscribing...'
  if (data) {
    message = 'Unsubscribed ✅'
  }

  return <main className="Unsubscribe">{message}</main>
}

export default withRouter(Unsubscribe)
