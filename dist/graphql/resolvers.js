import { User } from "../models/user.js";
//test NOTE: remove
// type User = {
//     id: string
//     username: string
// }
// const users: User[] = [{id: "1", username: "bob"}, {id: "2", username: "sam"}]
export const resolvers = {
    // Query: {
    //     getUsers: () => {
    //         return users
    //     }
    // }
    Mutation: {
        async signUp(_, { signUpInput: { username, email, password } }) {
            const newUser = new User({
                username,
                email,
                password
            });
            const res = await newUser.save();
            console.log(res);
            // return res
            return {
                email: res.email,
                id: res.id,
                password: res.password,
                username: res.username
            };
        }
    }
};
