import { createHmac, randomBytes } from "crypto";
import { prismaClient } from "../lib/db";
import JWT from "jsonwebtoken";

const JWT_SECRET = "Ashish@2899T";

export interface CreateUserPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  designation: string;
}

export interface GetUserTokenPayload {
  email: string;
  password: string;
}

class UserService {
  private static generateHash(salt: string, password: string) {
    const hashPassword = createHmac("sha256", salt)
      .update(password)
      .digest("hex");

    return hashPassword;
  }

  public static createUser(payload: CreateUserPayload) {
    const { firstName, lastName, email, password, designation } = payload;

    const salt = randomBytes(32).toString("hex");
    const hashedPassword = UserService.generateHash(salt, password);
    return prismaClient.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        salt,
        designation,
      },
    });
  }

  public static getUserById(id: string) {
    return prismaClient.user.findUnique({ where: { id } });
  }

  private static getUserByEmail(email: string) {
    return prismaClient.user.findUnique({ where: { email } });
  }

  public static async getUserToken(payload: GetUserTokenPayload) {
    const { email, password } = payload;

    const user = await UserService.getUserByEmail(email);

    if (!user) throw new Error("User Not Found");

    const userSalt = user.salt;
    const userHashPassword = UserService.generateHash(userSalt, password);

    if (userHashPassword !== user.password)
      throw new Error("Incorect Password");

    // Get Token

    const token = JWT.sign({ id: user.id, email: user.email }, JWT_SECRET);
    return token;
  }

  public static decodeUserToken(token: string) {
    return JWT.verify(token, JWT_SECRET);
  }
}

export default UserService;
