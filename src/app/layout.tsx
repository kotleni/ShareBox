import "./globals.scss";
import Link from "next/link";
import { ThemeProvider } from "@/app/components/ThemeProvider";
import LogoIcon from "@/app/icons/LogoIcon";
import { Avatar, AvatarFallback, AvatarImage } from "./components/Avatar";
import { Toaster } from "@/app/components/Sonner";
import { languages } from "@/i18n/settings";
import { getT } from "@/i18n";
import { Metadata } from "next";

export async function generateStaticParams() {
    return languages.map((lng) => ({ lng }));
}

export async function generateMetadata(): Promise<Metadata> {
    const { t } = await getT("metadata");
    return {
        title: t("application_name"),
        description: t("application_description"),
        applicationName: t("application_name"),
    };
}

const RootLayout = async ({
    children,
}: Readonly<{ children: React.ReactNode }>) => {
    const { i18n } = await getT();
    return (
        <html lang={i18n.resolvedLanguage} suppressHydrationWarning>
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
