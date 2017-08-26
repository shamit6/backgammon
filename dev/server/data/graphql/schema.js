import { makeExecutableSchema } from 'graphql-tools'

import resolvers from './resolvers';

const typeDefs = `

scalar MomentDate

type User {
  id: ID!
  username: String!
  firstName: String!
  lastName: String!
  country: String!
  image: String
}

type PlayerRecord {
  turkishMarsLoss: Int
  marsLoss: Int
  loss: Int
  draw: Int
  win: Int
  marsWin: Int
  turkishMarsWin: Int
}

type PlayerBasicRecord {
  loss: Int
  draw: Int
  win: Int
}

type PlayerInfo {
  id: ID!
  username: String!
  basicRecord: PlayerBasicRecord
  image: String
}

type Game {
  id: ID!
  opponent: String
  date: MomentDate!
  score: String!
}

type PlayerStat {
  id: ID!
  record: PlayerRecord
}

type Query {
  players(username: String!): [User]
  playerInfo(id: ID!): PlayerInfo
  playerStat(id: ID!, skip: Int): PlayerStat
  playerGames(id: ID!, offset: Int, limit: Int): [Game]
}
`;


const schema = makeExecutableSchema({ typeDefs, resolvers });
export default schema;
