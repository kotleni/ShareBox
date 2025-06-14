"use server";

import { createAuthRepository, User } from "@/repositories/AuthRepository";
import { ActionResult, ResultBuilder } from "@/app/actions/result";
import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";

async function login(
    username: string,
    password: string,
): Promise<ActionResult<User>> {
    try {
        const result = await signIn("credentials", {
            username,
            password,
            redirect: false,
        });

        if (result?.error) {
            return ResultBuilder.failure({ code: 0, name: result.error });
        }

        return ResultBuilder.success({
            username,
            password,
            token: "", // Token is handled by NextAuth
        });
    } catch (error) {
        if (error instanceof AuthError) {
            return ResultBuilder.failure({ code: 0, name: error.name });
        }
        return ResultBuilder.failure({ code: 0, name: (error as Error).name });
    }
}

async function register(
    username: string,
    password: string,
): Promise<ActionResult<User>> {
    const authRepository = createAuthRepository();
    try {
        // Register the user
        await authRepository.register(username, password);

        // Sign in the user
        return await login(username, password);
    } catch (error) {
        return ResultBuilder.failure({ code: 0, name: (error as Error).name });
    }
}

async function logout() {
    await signOut({ redirect: true });
}

async function signInGithub() {
    await signIn("github");
}

export { login, register, logout, signInGithub };
