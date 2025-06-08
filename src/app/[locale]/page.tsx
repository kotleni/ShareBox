import { Button } from "@/app/components/Button";
import Link from "next/link";
import { CloudUpload } from "lucide-react";

export default async function Home() {
    return (
        <main className="w-full h-full flex flex-col flex-wrap grow-1 justify-center items-center">
            <CloudUpload width={64} height={64} className="mb-8" />
            <p className="text-xl text-center mb-8 mt-1 px-8 md:px-42 lg:px-64 xl:px-128">
                ShareBox is a file sharing platform that allows you to share
                files anyone using generated links. Fully open-source,
                self-hostable, quick and easy to use.
            </p>

            <div className="flex gap-3 justify-center">
                <Button variant="default" size="lg" asChild>
                    <Link href={`/auth`}>Create account</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                    <Link
                        href="https://github.com/kotleni/ShareBox"
                        target="_blank"
                    >
                        Open GitHub
                    </Link>
                </Button>
            </div>
        </main>
    );
}
