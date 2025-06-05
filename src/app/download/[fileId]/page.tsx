import { Button } from "@/app/components/Button"
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/app/components/Tooltip"
import Link from "next/link"

const DownloadPage = async ({
    params,
}: {
    params: Promise<{ fileId: string }>
}) => {
    const { fileId } = await params

    return (
        <main className="w-full h-full flex flex-col flex-wrap gap-2 grow-1 justify-center items-center">
            <div className="w-100 flex gap-2 flex-col bg-card border-2 border rounded-lg p-6 shadow-sm">
                <h1 className="text-1xl font-semibold">Shared file</h1>
                <div>
                    henta.zip
                    <span className="pl-1 text-muted-foreground">12 Mb</span>
                </div>
                <div className="text-muted-foreground">
                    <span className="pr-1">Shared by</span>
                    <Tooltip>
                        <TooltipTrigger>
                            <span className="text-accent-foreground">
                                @kotleni
                            </span>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>This file provided by user user.</p>
                        </TooltipContent>
                    </Tooltip>
                </div>
                <Button className="mt-1" variant="outline" size="lg" asChild>
                    <Link href={"/src/app/files" + fileId}>Download</Link>
                </Button>
            </div>
        </main>
    )
}

export default DownloadPage
