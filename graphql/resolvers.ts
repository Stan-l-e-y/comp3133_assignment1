import { Resolvers } from '../src/generated/graphql';
import { User } from '../models/user.js';
import crypto from 'crypto';

export const resolvers: Resolvers = {
  Query: {
    async login(_, { loginInput: { email, password } }) {
      const hash = crypto.createHash('sha256').update(password).digest('hex');
      const user = await User.findOne({ email });
      if (!user) return 'invalid credentials';

      if (user.password == hash) {
        return 'Successfully logged in';
      }
      return 'invalid credentials';
    },
  },
  Mutation: {
    async signUp(_, { signUpInput: { username, email, password } }) {
      const hash = crypto.createHash('sha256').update(password).digest('hex');
      const newUser = new User({
        username,
        email,
        password: hash,
      });

      const res = await newUser.save();

      return {
        email: res.email,
        id: res.id,
        password: res.password,
        username: res.username,
      };
    },
  },
};
