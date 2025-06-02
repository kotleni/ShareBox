"use client"

import Image from "next/image"
import LogoLight from "@/app/images/logo-light.svg"
import LogoDark from "@/app/images/logo-dark.svg"
import { useTheme } from "next-themes"

export default function Logo() {
    const theme = useTheme()
    return (
        <Image
            src={theme.resolvedTheme != "dark" ? LogoLight : LogoDark}
            alt="ShareBox logo"
        />
    )
}
