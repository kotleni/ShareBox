"use client";

import { TabsContent } from "@/app/components/Tabs";
import TextField from "@/app/components/TextField";
import { Button } from "@/app/components/Button";
import { useState } from "react";
import { LoaderCircle } from "lucide-react";
import { FieldValues, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

enum AuthBlockErrorType {
    Unknown,
    InvalidCredentials,
}

interface AuthBlockProps {
    type: "login" | "register";
    onSuccess: () => void;
    onError: (type: AuthBlockErrorType) => void;
}

type Token = { token: string };

interface ShareBoxAPI {
    login: (username: string, password: string) => Promise<Token>;
    register: (username: string, password: string) => Promise<Token>;
}

class ShareBoxAPIImpl implements ShareBoxAPI {
    async login(username: string, password: string): Promise<Token> {
        return fetch("/api/auth/login", {
            method: "POST",
            body: JSON.stringify({ username, password }),
        })
            .then((res) => {
                if (!res.ok) throw res;
                return res.json();
            })
            .then((data) => {
                return data as unknown as Token;
            })
            .catch((e) => {
                throw e;
            });
    }

    async register(username: string, password: string): Promise<Token> {
        return fetch("/api/auth/reg", {
            method: "POST",
            body: JSON.stringify({ username, password }),
        })
            .then((res) => {
                if (!res.ok) throw res;
                return res.json();
            })
            .then((data) => {
                return data as unknown as Token;
            })
            .catch((e) => {
                throw e;
            });
    }
}

const AuthBlock = (props: AuthBlockProps) => {
    const { t } = useTranslation();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [isLoading, setLoading] = useState(false);

    const doLogin = async (data: FieldValues) => {
        setLoading(true);

        const api: ShareBoxAPI = new ShareBoxAPIImpl();
        api.login(data.username, data.password)
            .then((token) => {
                console.log(`Login OK, token: ${token.token}`);
                props.onSuccess();
            })
            .catch((e) => {
                console.error(e);
                props.onError(AuthBlockErrorType.InvalidCredentials);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const doRegister = async (data: FieldValues) => {
        if (data.password !== data.password_verification) {
            return;
        }

        const api: ShareBoxAPI = new ShareBoxAPIImpl();
        api.register(data.username, data.password)
            .then((token) => {
                console.log(`Register OK, token: ${token.token}`);
                props.onSuccess();
            })
            .catch((e) => {
                console.error(e);
                props.onError(AuthBlockErrorType.InvalidCredentials);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <div>
            <TabsContent value={props.type}>
                <form
                    onSubmit={handleSubmit((data) => {
                        console.log(data);
                        if (props.type === "login") doLogin(data);
                        else doRegister(data);
                    })}
                    className="w-full flex gap-2 flex-col bg-card border-2 border rounded-lg p-6 shadow-sm"
                >
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
                        {...register("username", { required: true })}
                        className="w-full"
                        type="text"
                        placeholder={t("login_placeholder")}
                    />
                    <TextField
                        {...register("password", {
                            required: true,
                            minLength: 6,
                        })}
                        className="w-full"
                        type="password"
                        placeholder={t("password_placeholder")}
                    />
                    <TextField
                        {...register("password_verification", {
                            required: props.type !== "login",
                            minLength: 6,
                        })}
                        className="w-full"
                        type="password"
                        placeholder={t("password_verification_placeholder")}
                        hidden={props.type === "login"}
                    />
                    {errors.password && (
                        <span>Password verification is required</span>
                    )}
                    <div className="flex flex-col gap-2 grow-1 pt-3">
                        <Button
                            variant="default"
                            type="submit"
                            disabled={isLoading}
                        >
                            {props.type === "login"
                                ? t("login_button")
                                : t("register_button")}
                            <span className="pl-1" hidden={!isLoading}>
                                <LoaderCircle />
                            </span>
                        </Button>
                    </div>
                </form>
            </TabsContent>
        </div>
    );
};

export { AuthBlock, AuthBlockErrorType };
