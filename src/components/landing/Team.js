import React from 'react'
import { Query, withApollo } from 'react-apollo'
import gql from 'graphql-tag'
import Button from 'material-ui/Button'
import { withRouter } from 'react-router'

let attemptingToClaim = false

const Team = ({ urlToken, user, login, client, history }) => {
  const claimSeat = async () => {
    if (user) {
      if (user.hasPurchased && !attemptingToClaim) {
        alert(
          'You already have access to the Guide. Contact us with questions: team@graphql.guide'
        )
      } else {
        // todo spinner
        await client
          .mutate({ mutation: JOIN_TEAM, variables: { urlToken } })
          .catch()
        history.push('/welcome')
      }
      attemptingToClaim = false
    } else {
      attemptingToClaim = true
      login()
    }
  }

  const claimerJustLoggedIn = attemptingToClaim && user
  if (claimerJustLoggedIn) {
    claimSeat()
  }

  return (
    <main className="Team">
      <Query query={TEAM_QUERY} variables={{ urlToken }}>
        {({ loading, data }) => {
          if (loading) return <div className="Spinner" />

          if (!data.team) return 'No such team'
          const {
            team: { name, totalSeats, members }
          } = data
          const seatsLeft = totalSeats - members.length

          return (
            <div>
              <div className="Team-header-wrapper">
                <header className="Team-header">
                  <h1>Team {name}</h1>
                </header>
              </div>
              <div className="Team-content">
                {seatsLeft && (
                  <p>
                    {seatsLeft} seat{(seatsLeft > 1) && 's'} left
                    <Button
                      color="primary"
                      variant="raised"
                      className="Team-claim-seat"
                      onClick={claimSeat}
                    >
                      Claim seat
                    </Button>
                  </p>
                )}
                <div className="Team-member-list">
                  <p>Team members:</p>
                  <ul>
                    {members.map(({ name, id }) => (
                      <li key={id}>{name}</li>
                    ))}
                  </ul>
                </div>
                <p className="Team-summary">
                  {totalSeats}-seat license. Add 5 more seats{' '}
                  <a href="//paypal.me/graphqlguide/1000">by PayPal</a>. (Put
                  the team name in the payment note.)
                </p>
              </div>
            </div>
          )
        }}
      </Query>
    </main>
  )
}

const TEAM_QUERY = gql`
  query TeamQuery($urlToken: String!) {
    team(urlToken: $urlToken) {
      id
      members {
        id
        name
      }
      name
      totalSeats
    }
  }
`

const JOIN_TEAM = gql`
  mutation JoinTeamMutation($urlToken: String!) {
    joinTeam(urlToken: $urlToken) {
      id
      members {
        id
        name
        hasPurchased
      }
    }
  }
`

export default withApollo(withRouter(Team))
