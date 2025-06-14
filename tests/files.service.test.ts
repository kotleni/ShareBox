import { expect, test } from "@jest/globals";
import { createFilesService } from "@/services/FilesService";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const filesService = createFilesService(prisma);

test("Create new file", async () => {
    const file = await filesService.createFile("a.zip", 2000000, 1);
    expect(file.id).not.toBe(null);
});