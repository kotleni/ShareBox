import { Tabs, TabsList, TabsTrigger } from "@/app/components/Tabs";
import AuthBlock from "@/app/components/AuthBlock";
import { Alert, AlertDescription, AlertTitle } from "@/app/components/Alert";
import { AlertCircleIcon } from "lucide-react";
import { getT } from "@/i18n";

export default async function AuthPage() {
    const { t } = await getT();

    return (
        <main className="w-full h-full flex flex-col flex-wrap gap-2 grow-1 justify-center items-center">
            <div className="m-4 sm:m-2 w-140 sm:w-fit md:w-100 lg:w-140 xl:w-140">
                <Alert className="w-full mb-4" variant="default">
                    <AlertCircleIcon />
                    <AlertTitle>{t("alert_title")}</AlertTitle>
                    <AlertDescription>
                        {t("alert_description")}
                        {/*<Button className="ml-auto text-muted-foreground" variant="outline">Close</Button>*/}
                    </AlertDescription>
                </Alert>
                <Tabs className="w-full" defaultValue="login">
                    <TabsList>
                        <TabsTrigger value="login">{t("login")}</TabsTrigger>
                        <TabsTrigger value="register">
                            {t("register")}
                        </TabsTrigger>
                    </TabsList>
                    <AuthBlock type="login" />
                    <AuthBlock type="register" />
                </Tabs>
            </div>
        </main>
    );
}
