import UserService, {
  CreateUserPayload,
  GetUserTokenPayload,
} from "../../services/user";

const queries = {
  getUserToken: async (_: any, payload: GetUserTokenPayload) => {
    const { email, password } = payload;
    const token = await UserService.getUserToken({
      email,
      password,
    });
    return token;
  },

  getCurrentLoggedInUser: async (_: any, parameters: any, context: any) => {
    if (context && context.user) {
      const id = context.user.id;

      const user = UserService.getUserById(id);
      return user;
    }
  },
};

const mutations = {
  createUser: async (_: any, payload: CreateUserPayload) => {
    const res = await UserService.createUser(payload);
    return res.id;
  },
};

export const resolvers = { queries, mutations };
