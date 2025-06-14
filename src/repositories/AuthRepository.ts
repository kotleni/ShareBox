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

            return {
                username: newUser.username!,
                password: newUser.password!,
                token: "", // Token is handled by NextAuth.js
            };
        } catch (error) {
            throw new UnknownAuthError((error as Error).message);
        }
    }

    async login(username: string, password: string) {
        if (!username || !password) {
            throw new InvalidCredentialsError();
        }

        const existingUser = await this.prisma.user.findUnique({
            where: { username: username },
        });

        if (!existingUser) {
            throw new InvalidCredentialsError();
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(
            password,
            existingUser.password ?? "",
        );
        if (!isPasswordValid) {
            throw new InvalidCredentialsError();
        }

        return {
            username,
            password,
            token: "", // Token is handled by NextAuth.js
        };
    }

    async identifyUser(token: string) {
        return { username: "test", password: "<PASSWORD>", token };
    }
}

const createAuthRepository = (): AuthRepository => new AuthRepositoryImpl();

export { createAuthRepository };
export type { AuthRepository, User };
