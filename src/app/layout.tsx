import "./globals.scss";
import type { Metadata } from "next";
import Link from "next/link";
import { ThemeProvider } from "@/app/components/ThemeProvider";
import LogoIcon from "@/app/icons/LogoIcon";
import { Avatar, AvatarFallback, AvatarImage } from "./components/Avatar";
import { Toaster } from "@/app/components/Sonner";
import { getLocaleName } from "@/i18n/resolver";

export const metadata: Metadata = {
    title: "ShareBox",
    description: "Open-source file sharing platform",
};

const RootLayout = async ({
    children,
}: Readonly<{ children: React.ReactNode }>) => {
    return (
        <html lang={await getLocaleName()} suppressHydrationWarning>
            <head>
                <title>ShareBox</title>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
            </head>
            <body className="w-screen min-h-screen flex flex-col bg-slate-900">
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
                            <Link href="/auth" className="hover:underline">
                                <span hidden={false}>Login</span>
                                <Avatar hidden={true}>
                                    <AvatarImage
                                        src="https://github.com/kotleni.png"
                                        alt="@kotleni"
                                    />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            </Link>
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
            </body>
        </html>
    );
};

export default RootLayout;
