import client from "../client";
import jsonwebtoken from "jsonwebtoken";

export const getUser = async (token) => {
  try {
    if (!token) {
      return null;
    }
    const { id } = await jsonwebtoken.verify(token, process.env.SECRET_KEY);
    const user = await client.user.findUnique({ where: { id } });

    if (user) {
      return user;
    } else {
      return null;
    }
  } catch {
    return null;
  }
};

export const protectedResolver =
  (ourResolver) => (root, args, context, info) => {
    if (!context.loggedInUser) {
      return {
        ok: false,
        error: "Please Login first",
      };
    }
    return ourResolver(root, args, context, info);
  };
