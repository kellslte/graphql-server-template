import { PrismaClient } from "@prisma/client";
import { extractSelections } from './../@utils/extractSelections';
import { GraphQLResolveInfo } from "graphql";

interface GetUsersArgs {
    info: GraphQLResolveInfo;
}

interface GetUserArgs extends GetUsersArgs {
    id: string;
}

interface UserInput {
    email: string
    username?: string
}

const prisma = new PrismaClient();

export const getUsers = async ({ info }: GetUsersArgs) => {
    const selections = extractSelections(info);
    const postsIncluded = selections.includes("posts");

    if (postsIncluded) {
        return await prisma.user.findMany({
            include: {
                posts: true
            }
        });
     }

    return await prisma.user.findMany();
}
 
export const getUser = async ({ id, info }: GetUserArgs) => {
    const selections = extractSelections(info);
    const postsIncluded = selections.includes("posts");

    if (postsIncluded) { 
        return await prisma.user.findUnique({where: {id}, include: {posts: true}});
    }

    return await prisma.user.findUnique({where: {id}});
}


export const createUser = async ({email, username}: UserInput) => {
    const user = await prisma.user.create({ data: { email: email, username: username } });
    
    return user;
}