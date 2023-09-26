import { userResolver } from './@resolvers/user.resolver';
import { readFileSync } from "fs";
import { join } from "path";

const userTypes = readFileSync(join(__dirname, "./@typeDefs/user.graphql"), {
    encoding: "utf-8"
});

const postTypes = readFileSync(join(__dirname, "./@typeDefs/post.graphql"), { encoding: "utf-8" });

export const typeDefs = `
   ${userTypes}
   ${postTypes}
`;

export const resolvers = {
    Query: {
        ...userResolver.Query,
    },
    Mutation: {
        ...userResolver.Mutation,
    }
};