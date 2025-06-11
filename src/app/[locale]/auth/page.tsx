"use client";

import { Tabs, TabsList, TabsTrigger } from "@/app/components/Tabs";
import { AuthBlock, AuthBlockErrorType } from "@/app/components/AuthBlock";
import { Alert, AlertDescription, AlertTitle } from "@/app/components/Alert";
import { AlertCircleIcon } from "lucide-react";
import { useTranslation } from "@/i18n/client";
import { useState } from "react";

export default function AuthPage() {
    const { t } = useTranslation();

    const [authError, setAuthError] = useState<AuthBlockErrorType | undefined>(
        undefined,
    );

    const onSuccess = () => {
        // Redirect to home page after successful login/registration
        window.location.href = "/";
    };

    return (
        <main className="w-full h-full flex flex-col flex-wrap gap-2 grow-1 justify-center items-center">
            <div className="m-4 sm:m-2 w-140 sm:w-fit md:w-100 lg:w-140 xl:w-140">
                <Alert
                    className="w-full mb-4"
                    variant="destructive"
                    hidden={authError == undefined}
                >
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
                    <AuthBlock
                        type="login"
                        onError={(error) => setAuthError(error)}
                        onSuccess={onSuccess}
                    />
                    <AuthBlock
                        type="register"
                        onError={(error) => setAuthError(error)}
                        onSuccess={onSuccess}
                    />
                </Tabs>
            </div>
        </main>
    );
}
