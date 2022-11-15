import client from "../../client";
import { protectedResolver } from "../../users/users.utility";

export default {
  Mutation: {
    deleteComment: protectedResolver(async (_, { id }, { loggedInUser }) => {
      const comment = await client.comment.findUnique({
        where: { id },
        select: { userId: true },
      });
      if (!comment) {
        return {
          ok: false,
          error: "Comment Not Found",
        };
      } else if (comment.userId !== loggedInUser.id) {
        return {
          ok: false,
          error: "Authorization failed.",
        };
      } else {
        await client.comment.delete({ where: { id } });
        return {
          ok: true,
        };
      }
    }),
  },
};
