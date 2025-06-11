import { Button } from "@/app/components/Button";
import { signInGithub } from "@/app/actions/auth";

export default function GitHubSignInButton() {
    return (
        <form action={signInGithub}>
            <Button variant="default" type="submit">
                Signin with GitHub
            </Button>
        </form>
    );
}
