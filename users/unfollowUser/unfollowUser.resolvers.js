import client from "../../client";
import { protectedResolver } from "../users.utility";

export default {
  Mutation: {
    unfollowUser: protectedResolver(
      async (_, { userName }, { loggedInUser }) => {
        const ok = await client.user.findUnique({ where: { userName } });
        if (!ok) {
          return {
            ok: false,
            error: "can't unfollow the user",
          };
        }
        await client.user.update({
          where: {
            id: loggedInUser.id,
          },
          data: {
            following: {
              disconnect: { userName },
            },
          },
        });
        return {
          ok: true,
        };
      }
    ),
  },
};
