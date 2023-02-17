import { Resolvers } from "../src/generated/graphql";

//test NOTE: remove

type User = {
    username: string
}

const users: User[] = [{username: "bob"}, {username: "sam"}]

export const resolvers: Resolvers = {
    Query: {
        getUsers: () => {
            return users
        }
    }
}
