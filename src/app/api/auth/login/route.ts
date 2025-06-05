import { NextResponse } from "next/server";
import { createAuthRepository } from "@/repositories/AuthRepository";

export async function POST(request: Request) {
    const authRepository = createAuthRepository();
    const { username, password } = await request.json();

    const user = await authRepository.login(username, password);

    if (!user) {
        return NextResponse.json(
            {
                success: false,
                message: `Unknown error.`,
            },
            { status: 500 },
        );
    }

    return NextResponse.json({
        token: user.token,
    });
}
