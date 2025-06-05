import { TabsContent } from "@/app/components/Tabs"
import TextField from "@/app/components/TextField"
import { Button } from "@/app/components/Button"
import getTranslations from "@/i18n/getTranslations"

interface AuthBlockProps {
    type: "login" | "register"
}

const AuthBlock = async (props: AuthBlockProps) => {
    const { t } = await getTranslations()

    return (
        <div>
            <TabsContent value={props.type}>
                <div className="w-full flex gap-2 flex-col bg-card border-2 border rounded-lg p-6 shadow-sm">
                    <span className="text-1xl font-bold">
                        {props.type === "login"
                            ? t("login_title")
                            : t("register_title")}
                    </span>
                    <span className="text-1xl pb-3">
                        {props.type === "login"
                            ? t("login_subtitle")
                            : t("register_subtitle")}
                    </span>
                    <TextField
                        className="w-full"
                        type="text"
                        placeholder={t("login_placeholder")}
                    />
                    <TextField
                        className="w-full"
                        type="password"
                        placeholder={t("password_placeholder")}
                    />
                    <TextField
                        className="w-full"
                        type="password"
                        placeholder={t("password_verification_placeholder")}
                        hidden={props.type === "login"}
                    />
                    <div className="flex flex-col gap-2 grow-1 pt-3">
                        <Button variant="default">
                            {props.type === "login"
                                ? t("login_button")
                                : t("register_button")}
                        </Button>
                    </div>
                </div>
            </TabsContent>
        </div>
    )
}

export default AuthBlock
