import client from "../../client";
import { protectedResolver } from "../../users/users.utility";

export default {
  Mutation: {
    createComment: protectedResolver(
      async (_, { photoId, payload }, { loggedInUser }) => {
        const ok = await client.photo.findUnique({
          where: { id: photoId },
          select: { id: true },
        });
        if (!ok) {
          return {
            ok: false,
            error: "Photo Not Found",
          };
        }
        await client.comment.create({
          data: {
            payload,
            photo: { connect: { id: photoId } },
            user: { connect: { id: loggedInUser.id } },
          },
        });
        return {
          ok: true,
        };
      }
    ),
  },
};
