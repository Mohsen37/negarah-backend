// import Path from "path";
// import { makeExecutableSchema } from "@graphql-tools/schema";
// import { mergeTypeDefs, mergeResolvers } from "graphql-tools/merge";
import path from "path";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";
import { loadFilesSync } from "@graphql-tools/load-files";
import { print } from "graphql";

const loadedTypes = loadFilesSync(`${__dirname}/**/*.typeDefs.js`);
const loadedResolver = loadFilesSync(
  `${__dirname}/**/*.{queries,mutations}.js`
);

const typeDefs = mergeTypeDefs(loadedTypes);
const resolvers = mergeResolvers(loadedResolver);

const schema = makeExecutableSchema({ typeDefs, resolvers });
export default schema;
