"use client";

import { TabsContent } from "@/app/components/Tabs";
import TextField from "@/app/components/TextField";
import { Button } from "@/app/components/Button";
import { useState } from "react";
import { LoaderCircle } from "lucide-react";
import { FieldValues, useForm } from "react-hook-form";
import { useTranslation } from "next-i18next";

interface AuthBlockProps {
    type: "login" | "register";
}

const AuthBlock = (props: AuthBlockProps) => {
    const { t } = useTranslation();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [isLoading, setLoading] = useState(false);

    const doLogin = (data: FieldValues) => {
        setLoading(true);
        fetch("/api/auth/login", {
            method: "POST",
            body: JSON.stringify({
                username: data.username,
                password: data.password,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data.token);
                setLoading(false);
            });
    };

    const doRegister = (data: FieldValues) => {
        if (data.password !== data.password_verification) {
            return;
        }

        setLoading(true);
        fetch("/api/auth/reg", {
            method: "POST",
            body: JSON.stringify({
                username: data.username,
                password: data.password,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data.token);
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

export default AuthBlock;
