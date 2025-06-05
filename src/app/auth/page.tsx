import { Tabs, TabsList, TabsTrigger } from "@/app/components/Tabs";
import AuthBlock from "@/app/components/AuthBlock";
import { Alert, AlertDescription, AlertTitle } from "@/app/components/Alert";
import { AlertCircleIcon } from "lucide-react";
import { getTranslations } from "@/i18n/resolver";

export default async function AuthPage() {
    const { t } = await getTranslations();

    return (
        <main className="w-full h-full flex flex-col flex-wrap gap-2 grow-1 justify-center items-center">
            <div className="m-4 sm:m-2">
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
