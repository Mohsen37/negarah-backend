import client from "../../client";
import { protectedResolver } from "../../users/users.utility";

export default {
  Mutation: {
    readMessage: protectedResolver(async (_, { id }, { loggedInUser }) => {
      const message = client.message.findFirst({
        where: {
          id,
          userId: { not: loggedInUser.id },
          room: { users: { some: { id: loggedInUser.id } } },
        },
        select: {
          id: true,
        },
      });
      if (!message) {
        return {
          ok: false,
          error: "message not found",
        };
      }
      await client.message.update({ where: { id }, data: { read: true } });
      return {
        ok: true,
      };
    }),
  },
};
