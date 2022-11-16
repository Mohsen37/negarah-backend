import { createWriteStream } from "fs";
import client from "../../client";
import bcrypt from "bcrypt";
import { protectedResolver } from "../users.utility";
import { uploadToS3 } from "../../shared/shared.utility";
export default {
  Mutation: {
    editProfile: protectedResolver(
      async (
        _,
        {
          firstName,
          lastName,
          userName,
          email,
          password: newPassword,
          bio,
          avatar,
        },
        { loggedInUser, protectedResolver }
      ) => {
        let avatarUrl = null;
        if (avatar) {
          avatarUrl = await uploadToS3(avatar, loggedInUser.id, "avatars");
          // --------------------------------
          // IF WE WANT TO SAVE IN OUR SERVER
          // --------------------------------
          // const { filename, createReadStream } = await avatar;
          // const newFilename = `${loggedInUser.id}-${Date.now()}-${filename}`;
          // const readStream = await createReadStream();
          // const writeStream = await createWriteStream(
          //   process.cwd() + "/uploads/" + newFilename
          // );
          // readStream.pipe(writeStream);
          // avatarUrl = `http://localhost:4000/static/${newFilename}`;
        }
        protectedResolver(loggedInUser);
        let uglyPassword = null;
        if (newPassword) {
          uglyPassword = await bcrypt.hash(newPassword, 10);
        }
        const updatedUser = await client.user.update({
          where: {
            id: loggedInUser.id,
          },
          data: {
            firstName,
            lastName,
            userName,
            email,
            bio,
            ...(uglyPassword && { password: uglyPassword }),
            ...(avatarUrl && { avatar: avatarUrl }),
          },
        });
        if (updatedUser.id) {
          return {
            ok: true,
          };
        } else {
          return {
            ok: false,
            error: "Could not update the Profile",
          };
        }
      }
    ),
  },
};
