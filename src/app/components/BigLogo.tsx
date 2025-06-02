import Image from "next/image"
import LogoImage from "@/app/images/logo-dark.svg"

export default function BigLogo() {
    return (
        <Image
            className="w-70 hover:w-72 transition-all"
            src={LogoImage}
            alt="logo"
        />
    )
}
