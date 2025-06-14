import NextAuth from "next-auth";
import GitHub from "@auth/core/providers/github";

export type AuthUser = {
    username: string;
    role: string;
};

// https://authjs.dev/getting-started/authentication/oauth
export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    pages: {
        signIn: "/login",
    },
    providers: [GitHub],
});
