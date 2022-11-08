import client from "../../client";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";

export default {
  Mutation: {
    login: async (_, { userName, password }) => {
      const user = await client.user.findFirst({ where: { userName } });
      if (!user) {
        return {
          ok: false,
          error: "user not found",
        };
      }
      const passwordOk = await bcrypt.compare(password, user.password);
      if (!passwordOk) {
        return {
          ok: false,
          error: "Incorrect Password",
        };
      }
      const token = jsonwebtoken.sign({ id: user.id }, process.env.SECRET_KEY);
      return {
        ok: true,
        token,
      };
    },
  },
};
