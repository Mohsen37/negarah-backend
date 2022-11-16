// import {
//   S3Client,
//   PutObjectCommand,
//   GetObjectCommand,
// } from "@aws-sdk/client-s3";

// const s3 = new S3Client({
//   region: "default",
//   endpoint: process.env.ARVAN_ENDPOINT,
//   credentials: {
//     accessKeyId: process.env.ARVAN_ACCESS_KEY,
//     secretAccessKey: process.env.ARVAN_SECRET_KEY,
//   },
// });
// export const uploadPhoto = async (file, userId) => {
//   const { filename, createReadStream } = await file;
//   const readStream = createReadStream();
//   const objectName = `${userId}-${Date.now()}-${filename}`;

//   const uploadPrams = {
//     Bucket: "mohsen-inest",
//     Key: objectName,
//     ACL: "public-read",
//     Body: readStream,
//   };
//   await s3
//     .send(new PutObjectCommand(uploadPrams))
//     .then((data) => console.log(data));

//   await s3
//     .send(
//       new GetObjectCommand({
//         Bucket: "mohsen-inest",
//         Key: objectName,
//       })
//     )
//     .then((meta) => console.log(`https://${meta.body}`));
//   return "";
// };

// --------------------------------

import AWS from "aws-sdk";

AWS.config.update({
  region: "default",
  endpoint: process.env.ARVAN_ENDPOINT,
  credentials: {
    accessKeyId: process.env.ARVAN_ACCESS_KEY,
    secretAccessKey: process.env.ARVAN_SECRET_KEY,
  },
});

export const uploadToS3 = async (file, userId, folderName) => {
  const { filename, createReadStream } = await file;
  const readStream = createReadStream();
  const objectName = `${folderName}/${userId}-${Date.now()}-${filename}`;

  const { Location } = await new AWS.S3()
    .upload({
      Bucket: "mohsen-inest",
      Key: objectName,
      ACL: "public-read",
      Body: readStream,
    })
    .promise();
  return Location;
};
