export default [`
type Subscriber {
  email: String
}

type Query {
  subscriber (email: String!): Subscriber
  allSubscribers: [Subscriber]
}

type Mutation {
  subscribe(email: String!): Subscriber
}

schema {
  query: Query
  mutation: Mutation
}
`]
