"use client";

import { Button } from "@/app/components/Button";
import { CloudUpload, File, Upload } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
} from "../../components/DropdownMenu";
import { DropdownMenuTrigger } from "@/app/components/DropdownMenu";
import { Progress } from "@/app/components/Progress";
import Link from "next/link";
import { toast } from "sonner";

interface FileItemProps {
    downloadUrl: string;
    isUploading: boolean;
    onShareClick: () => void;
    onRemoveClick: () => void;
}

const FileItem = (props: FileItemProps) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div className="w-full h-full min-h-[40px] hover:bg-muted cursor-pointer flex flex-col items-center justify-center gap-1 border rounded-lg p-4">
                    <div hidden={props.isUploading}>
                        <File />
                    </div>
                    <div hidden={!props.isUploading}>
                        <Upload className="animate-wiggle" />
                    </div>
                    henta.zip
                    <div
                        className="text-muted-foreground"
                        hidden={props.isUploading}
                    >
                        12 Mb
                    </div>
                    <div
                        className="text-muted-foreground"
                        hidden={!props.isUploading}
                    >
                        Uploading
                    </div>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
                <DropdownMenuLabel>File</DropdownMenuLabel>
                <DropdownMenuGroup>
                    <Link
                        href={props.downloadUrl}
                        target="_blank"
                        hidden={props.isUploading}
                    >
                        <DropdownMenuItem>Download</DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem
                        onClick={props.onShareClick}
                        hidden={props.isUploading}
                    >
                        Share
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={props.onRemoveClick}
                        variant="destructive"
                    >
                        Remove
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

const FilesPage = () => {
    return (
        <div className="p-4">
            <div className="flex flex-row gap-2">
                <Button variant="outline" size="lg">
                    <CloudUpload />
                    Upload file
                </Button>

                <div className="w-full ml-auto flex flex-col items-end gap-1">
                    <span className="text-muted-foreground">
                        Storage: 12 Mb / 100 Mb
                    </span>
                    <Progress className="w-48" value={12} />
                </div>
            </div>

            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {Array.from({ length: 12 }).map((_, i) => (
                    <FileItem
                        key={i}
                        downloadUrl="/file.zip"
                        isUploading={false}
                        onShareClick={() => {
                            toast("Sharing url copied");
                        }}
                        onRemoveClick={() => {}}
                    />
                ))}
                <FileItem
                    downloadUrl="/hentai.zip"
                    isUploading={true}
                    onShareClick={() => {
                        toast("Sharing url copied");
                    }}
                    onRemoveClick={() => {}}
                />
            </div>
        </div>
    );
};

export default FilesPage;
