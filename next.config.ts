import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: "standalone",
    i18n: {
        locales: ["en-US", "uk-UA"],
        defaultLocale: "en-US",
    },
};

export default nextConfig;
