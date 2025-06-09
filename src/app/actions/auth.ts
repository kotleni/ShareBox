"use server";

import { createAuthRepository, User } from "@/repositories/AuthRepository";
import { ActionResult, ResultBuilder } from "@/app/actions/result";

async function login(
    username: string,
    password: string,
): Promise<ActionResult<User>> {
    const authRepository = createAuthRepository();
    try {
        return ResultBuilder.success(
            await authRepository.login(username, password),
        );
    } catch (error) {
        return ResultBuilder.failure({ code: 0, name: (error as Error).name });
    }
}

async function register(
    username: string,
    password: string,
): Promise<ActionResult<User>> {
    const authRepository = createAuthRepository();
    try {
        return ResultBuilder.success(
            await authRepository.register(username, password),
        );
    } catch (error) {
        return ResultBuilder.failure({ code: 0, name: (error as Error).name });
    }
}

export { login, register };
