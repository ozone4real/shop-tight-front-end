import gql from 'graphql-tag';

export const typeDefs = gql`
  extend type User {
    user: User
  }
`

export const resolvers = {}