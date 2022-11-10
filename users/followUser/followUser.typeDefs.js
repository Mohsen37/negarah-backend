import { gql } from "apollo-server-express";
export default gql`
  type FollowUSerResult {
    ok: Boolean!
    error: String
  }

  type Mutation {
    followUser(userName: String!): FollowUSerResult!
  }
`;
