import { gql } from "apollo-server-express";

export default gql`
  type User {
    id: String!
    firstName: String!
    lastName: String
    userName: String!
    email: String!
    bio: String
    avatar: String
    following: [User]
    followers: [User]
    createdAt: String!
    updatedAt: String!
  }
`;
