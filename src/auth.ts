import { jwtVerify, SignJWT } from "jose";

export function getJwtSecretKey() {
    const secret = process.env.NEXT_PUBLIC_JWT_SECRET_KEY;

    if (!secret) {
        throw new Error("JWT Secret key is not matched");
    }

    return new TextEncoder().encode(secret);
}

export async function verifyJwtToken(token: string) {
    try {
        const { payload } = await jwtVerify(token, getJwtSecretKey());
        return payload;
    } catch (error) {
        return null;
    }
}

export async function createJwtToken(username: string) {
    return await new SignJWT({
        username: username,
        role: "user",
    })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("30d")
        .sign(getJwtSecretKey());
}