import "../globals.scss";
import Link from "next/link";
import { ThemeProvider } from "@/app/components/ThemeProvider";
import LogoIcon from "@/app/icons/LogoIcon";
import { Avatar, AvatarFallback } from "../components/Avatar";
import { Toaster } from "@/app/components/Sonner";
import { languages } from "@/i18n/settings";
import { I18nProvider } from "@/i18n/client";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import { logout } from "@/app/actions/auth";

export async function generateStaticParams() {
    return languages.map((lng) => ({ lng }));
}

const RootContent = async ({
    children,
}: Readonly<{ children: React.ReactNode }>) => {
    const session = await auth();
    const isAuthenticated = !!session;

    return (
        <SessionProvider>
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                <div className="w-full flex justify-between items-center px-4 md:px-8 py-4 border-b border-muted">
                    <Link href="/">
                        <LogoIcon />
                    </Link>
                    <div className="app-bar-links">
                        {!isAuthenticated ? (
                            <Link href="/auth" className="hover:underline">
                                <span>Login</span>
                            </Link>
                        ) : (
                            <div className="flex items-center gap-2">
                                <span>{session.user?.username}</span>
                                <Avatar>
                                    <AvatarFallback>
                                        {session.user?.username
                                            ?.substring(0, 2)
                                            .toUpperCase() || "U"}
                                    </AvatarFallback>
                                </Avatar>
                                <form action={logout}>
                                    <button
                                        type="submit"
                                        className="hover:underline"
                                    >
                                        Logout
                                    </button>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
                {children}
                <Toaster position="top-center" />
                <footer className="text-center mt-auto py-4">
                    Open source ShareBox platform.
                    <Link
                        className="text-muted-foreground hover:underline pl-1"
                        href="https://github.com/kotleni/ShareBox"
                    >
                        Source Code
                    </Link>
                </footer>
            </ThemeProvider>
        </SessionProvider>
    );
};

const RootLayout = async (
    props: Readonly<{
        children: React.ReactNode;
        params: Promise<{ locale: string }>;
    }>,
) => {
    const params = await props.params;
    const { locale } = params;

    return (
        <html lang={locale} suppressHydrationWarning>
            <head>
                <title>ShareBox</title>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
            </head>
            <body className="w-screen min-h-screen flex flex-col bg-slate-900">
                <I18nProvider locale={locale}>
                    <RootContent>{props.children}</RootContent>
                </I18nProvider>
            </body>
        </html>
    );
};

export default RootLayout;
