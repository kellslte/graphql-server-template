import { GraphQLResolveInfo } from 'graphql'
import * as userService from '../@services/user.service'

export const userResolver = {
    Query: {
        async users(_: any, args: Record<string, any>, context: any, info: GraphQLResolveInfo) {
            return await userService.getUsers({info})
        },
        async user(_: any, args: Record<string, any>, context: any, info: GraphQLResolveInfo) {
            return await userService.getUser({ id: args.id, info });
        }
    },
    Mutation: {
        async createUser(_: any, {user}: Record<string, any>, context: any, info: GraphQLResolveInfo) {
            return await userService.createUser({ email: user.email, username: user.username });
         },
        async updateUser(_: any, args: Record<string, any>, context: any, info: GraphQLResolveInfo) { },
        async deleteUser(_: any, args: Record<string, any>, context: any, info: GraphQLResolveInfo){}
    }
}