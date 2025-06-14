import GitHubSignInButton from "@/app/components/auth/GitHubSignInButton";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function AuthPage() {
    // const { t } = await getTranslation();

    const authorization = await auth();
    if (authorization && authorization?.user) {
        redirect("/files");
    }

    return (
        <main className="w-full h-full flex flex-col flex-wrap gap-2 grow-1 justify-center items-center">
            <div className="m-4 sm:m-2 w-70 sm:w-fit md:w-70 lg:w-70 xl:w-70 border-2 border-muted rounded-lg p-4 flex flex-col gap-2 items-center justify-center">
                Authorization
                <GitHubSignInButton />
            </div>
        </main>
    );
}
