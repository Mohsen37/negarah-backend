import client from "../../client";

export default {
  Query: {
    seeProfile: (_, { username }) =>
      client.user.findUnique({
        where: {
          userName: username,
        },
        include: {
          following: true,
          followers: true,
        },
      }),
  },
};
