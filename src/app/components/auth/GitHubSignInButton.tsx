import { Button } from "@/app/components/Button";
import { signInGithub } from "@/app/actions/auth";
import { GithubIcon } from "lucide-react";

export default function GitHubSignInButton() {
    return (
        <form action={signInGithub}>
            <Button variant="secondary" type="submit" className="w-60">
                <GithubIcon />
                SignIn with GitHub
            </Button>
        </form>
    );
}
