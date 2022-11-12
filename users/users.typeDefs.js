import { gql } from "apollo-server-express";

export default gql`
  type User {
    id: Int!
    firstName: String!
    lastName: String
    userName: String!
    email: String!
    bio: String
    avatar: String
    photos: [Photo]
    following: [User]
    followers: [User]
    totalFollowing: Int
    totalFollowers: Int
    isMe: Boolean!
    isFollowing: Boolean!
    createdAt: String!
    updatedAt: String!
  }
`;

// isFollowing: Boolean!
//
