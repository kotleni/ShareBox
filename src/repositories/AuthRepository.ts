import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";
import {
    InvalidCredentialsError,
    UnknownAuthError,
    UserExistsError,
} from "@/errors/auth";

interface User {
    username: string;
    password: string;
    token: string;
}

interface AuthRepository {
    register: (username: string, password: string) => Promise<User>;
    login: (username: string, password: string) => Promise<User>;
    identifyUser: (token: string) => Promise<User>;
}

class AuthRepositoryImpl implements AuthRepository {
    private prisma: PrismaClient = new PrismaClient();

    async register(username: string, password: string) {
        if (!username || !password) {
            throw new InvalidCredentialsError();
        }

        const existingUser = await this.prisma.user.findUnique({
            where: { username: username },
        });

        if (existingUser) {
            throw new UserExistsError();
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        try {
            const newUser = await this.prisma.user.create({
                data: {
                    username: username,
                    password: hashedPassword, // Store the hashed password
                },
            });

            // TODO: Implement JWT generation)
            const token = "s78df6a678fasd8776dsa4545f";

            return {
                username: newUser.username!,
                password: newUser.password!,
                token: token,
            };
        } catch (error) {
            throw new UnknownAuthError();
        }
    }

    async login(username: string, password: string) {
        return { username, password, token: "" };
    }

    async identifyUser(token: string) {
        return { username: "test", password: "<PASSWORD>", token };
    }
}

const createAuthRepository = (): AuthRepository => new AuthRepositoryImpl();

export { createAuthRepository };
export type { AuthRepository, User };
