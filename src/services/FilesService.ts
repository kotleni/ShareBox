import { v4 as uuidv4 } from 'uuid';
import { Prisma, PrismaClient } from "@prisma/client";
import prisma from "@/lib/prisma";

interface File {
    id: string;
    fullName: string;
    size: number;
    ownerId: number;
    isShared: boolean;
}

interface FilesService {
    getUserFiles(userId: number): Promise<File[]>;
    removeFile(fileId: string): Promise<void>;
    createFile(name: string, size: number, userId: number): Promise<File>;
}

class FilesServiceImpl implements FilesService {
    constructor(private prisma: PrismaClient | Prisma.TransactionClient = prisma) {}

    async getUserFiles(userId: number): Promise<File[]> {
        const files = await this.prisma.file.findMany({ where: {ownerId: userId} });
        return files.map((file) => {
            return {
                id: file.id,
                fullName: file.name,
                size: file.size,
                ownerId: file.ownerId,
                isShared: file.isShared,
            };
        });
    }

    async removeFile(fileId: string): Promise<void> {
        await this.prisma.file.delete({where: { id: fileId }});
    }

    async createFile(name: string, size: number, userId: number): Promise<File> {
        const uuid =  uuidv4();
        const file: File = {
            id: uuid,
            fullName: name,
            size: size,
            ownerId: userId,
            isShared: false
        };
        await this.prisma.file.create({
            data: {
                id: file.id,
                name: file.fullName,
                size: file.size,
                ownerId: file.ownerId,
                isShared: file.isShared
            }
        });
        return file;
    }
}

function createFilesService(alternativePrisma: PrismaClient = prisma): FilesService {
    return new FilesServiceImpl(alternativePrisma);
}

export { createFilesService };
export type { FilesService, File };