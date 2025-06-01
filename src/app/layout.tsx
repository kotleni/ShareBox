import "./globals.scss";
import type {Metadata} from "next";
import Link from "next/link";
import {ThemeProvider} from "@/app/components/ThemeProvider";
import LogoIcon from "@/app/icons/LogoIcon";

export const metadata: Metadata = {
    title: "ShareBox",
    description: "Open-source file sharing platform",
};

const RootLayout = (
    {children}: Readonly<{ children: React.ReactNode }>
) => {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <title>ShareBox</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </head>
            <body className="min-h-screen flex flex-col bg-slate-900">
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                <div className="w-full flex justify-between items-center px-4 md:px-8 py-4 border-b border-muted">
                    <Link href="/"><LogoIcon/></Link>
                    <div className="app-bar-links">
                        <Link href="/auth" className="hover:underline">Account</Link>
                    </div>
                </div>
                {children}
                <footer className="text-center mt-auto py-4">
                Open source ShareBox platform.
                    <Link className="text-muted-foreground hover:underline pl-1" href="https://github.com/kotleni/ShareBox">Source Code</Link>
                </footer>
            </ThemeProvider>
            </body>
        </html>
    );
};

export default RootLayout;