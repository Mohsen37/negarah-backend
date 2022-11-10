import client from "../../client";
import { protectedResolver } from "../users.utility";

export default {
  Mutation: {
    followUser: protectedResolver(async (_, { userName }, { loggedInUser }) => {
      const ok = await client.user.findUnique({ where: { userName } });
      if (!ok) {
        return {
          ok: false,
          error: "The User doesn't exist",
        };
      }
      await client.user.update({
        where: {
          id: loggedInUser.id,
        },
        data: {
          following: {
            connect: {
              userName,
            },
          },
        },
      });
      return {
        ok: true,
      };
    }),
  },
};
