import { Tabs, TabsList, TabsTrigger } from "@/app/components/Tabs"
import AuthBlock from "@/app/components/AuthBlock"
import { Alert, AlertDescription, AlertTitle } from "@/app/components/Alert"
import { AlertCircleIcon } from "lucide-react"

export default function AuthPage() {
    return (
        <main className="w-full h-full flex flex-col flex-wrap gap-2 grow-1 justify-center items-center">
            <div className="m-4 sm:m-2">
                <Alert className="w-full mb-4" variant="default">
                    <AlertCircleIcon />
                    <AlertTitle>Unable to do it</AlertTitle>
                    <AlertDescription>
                        Please verify your account information and try again.
                        {/*<Button className="ml-auto text-muted-foreground" variant="outline">Close</Button>*/}
                    </AlertDescription>
                </Alert>
                <Tabs className="w-full" defaultValue="login">
                    <TabsList>
                        <TabsTrigger value="login">Login</TabsTrigger>
                        <TabsTrigger value="register">Register</TabsTrigger>
                    </TabsList>
                    <AuthBlock type="login" />
                    <AuthBlock type="register" />
                </Tabs>
            </div>
        </main>
    )
}
