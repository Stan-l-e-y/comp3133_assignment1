const users = [{ username: "bob" }, { username: "sam" }];
export const resolvers = {
    Query: {
        getUsers: () => {
            return users;
        }
    }
};
