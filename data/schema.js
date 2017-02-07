export default [`
type Subscriber {
  email: String,
  createdAt: String,
  source: String,
}

type Query {
  subscriber (email: String!): Subscriber
}

type Mutation {
  subscribe(email: String!): Subscriber
}

schema {
  query: Query
  mutation: Mutation
}
`]
