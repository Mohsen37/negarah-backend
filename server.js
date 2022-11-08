require("dotenv").config();
import { ApolloServer } from "apollo-server";
import { typeDefs, resolvers } from "./schema";
import { getUser, protectedResolver } from "./users/users.utility";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    return {
      loggedInUser: await getUser(req.headers.authorization),
      protectedResolver,
    };
  },
});
server
  .listen()
  .then(() =>
    console.log(
      `--------> ✳ Srever is Running in http://localhost:${process.env.PORT} ✅`
    )
  );
