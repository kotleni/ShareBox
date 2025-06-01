import {TabsContent} from "@/app/components/Tabs";
import TextField from "@/app/components/TextField";
import {Button} from "@/app/components/Button";

const titleTranslations = {
    login: "Login",
    register: "Register"
}

const subTitleTranslations = {
    login: "Enter your email and password below to login to your account",
    register: "Enter your email and password 2 times below to create an account"
}

const submitButtonTranslations = {
    login: "Login",
    register: "Register"
}

interface AuthBlockProps {
    type: "login" | "register"
}

const AuthBlock = (props: AuthBlockProps) => {
    return (
        <div>
            <TabsContent value={props.type}>
                <div className="w-full flex gap-2 flex-col bg-card border-2 border rounded-lg p-6 shadow-sm">
                    <span className="text-1xl font-bold">{titleTranslations[props.type]}</span>
                    <span className="text-1xl pb-3">{
                        subTitleTranslations[props.type]
                    }</span>
                    <TextField className="w-full" type="text" placeholder="Login"/>
                    <TextField className="w-full" type="password" placeholder="Password"/>
                    <TextField className="w-full" type="password" placeholder="Password verification"
                               hidden={props.type == "login"}/>
                    <div className="flex flex-col gap-2 grow-1 pt-3">
                        <Button variant="default">{submitButtonTranslations[props.type]}</Button>
                    </div>
                </div>
            </TabsContent>
        </div>
    )
};

export default AuthBlock;