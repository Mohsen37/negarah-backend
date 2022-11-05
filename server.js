import { ApolloServer, gql } from "apollo-server";
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

const typeDefs = gql`
  type Movie {
    id: Int
    title: String
    year: Int
    ganre: String
    createdAt: String
    updatedAt: String
  }

  type Query {
    movies: [Movie]
    movie(id: Int!): Movie
  }
  type Mutation {
    createMovie(title: String!, year: Int!, ganre: String): Movie
    deleteMovie(id: Int!): Movie
    updateMovie(id: Int!, year: Int!, title: String!, ganre: String): Movie
  }
`;

const resolvers = {
  Query: {
    movies: () => client.movie.findMany(),
    movie: (_, { id }) => client.movie.findUnique({ where: { id } }),
  },
  Mutation: {
    createMovie: (_, { title, year, ganre }) => {
      return client.movie.create({
        data: {
          title,
          year,
          ganre,
        },
      });
    },
    deleteMovie: (_, { id }) => client.movie.delete({ where: { id } }),
    updateMovie: (_, { id, year, title, ganre }) =>
      client.movie.update({ where: { id }, data: { title, year, ganre } }),
  },
};

const server = new ApolloServer({ typeDefs, resolvers });
server
  .listen()
  .then(() => console.log("Srever is Runnubg in http://localhost:4000"));
