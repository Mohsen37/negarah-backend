import client from "../../client";
import { protectedResolver } from "../users.utility";

export default {
  Query: {
    me: protectedResolver((_, __, { loggedInUser }) => {
      return client.user.findUnique({ where: { id: loggedInUser.id } });
    }),
  },
};
