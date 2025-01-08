import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

class UserModel {
  public static async getAllUsers(): Promise<User[]> {
    const users = await prisma.user.findMany();
    return users.map((user) => ({
      ...user,
      password: "********",
    }));
  }

  public static async getUserById(id: number): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { id } });
    if (user) {
      return {
        ...user,
        password: "********",
      };
    } else {
      return user;
    }
  }

  public static async getUserByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { email } });
    return user;
  }

  public static async createUser(
    name: string,
    email: string,
    password: string,
  ): Promise<User> {
    const hashedPassword = await Bun.password.hash(password, {
      algorithm: "bcrypt",
      cost: 10,
    });
    return await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });
  }

  public static async updateUser(
    id: number,
    name: string,
    email: string,
    password: string,
  ): Promise<User> {
    const hashedPassword = await Bun.password.hash(password, {
      algorithm: "bcrypt",
      cost: 10,
    });
    return await prisma.user.update({
      where: { id },
      data: { name, email, password: hashedPassword },
    });
  }

  public static async deleteUser(id: number): Promise<User> {
    return await prisma.user.delete({ where: { id } });
  }

  public static async verifyUser(
    email: string,
    password: string,
  ): Promise<User | null> {
    const user = await UserModel.getUserByEmail(email);
    if (user) {
      const isPasswordValid = await Bun.password.verify(
        password,
        user.password,
      );
      if (isPasswordValid) {
        return { ...user, password: "********" } as User;
      }
    }
    return null;
  }
}

export default UserModel;
