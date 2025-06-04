"use client"

import { TabsContent } from "@/app/components/Tabs"
import TextField from "@/app/components/TextField"
import { Button } from "@/app/components/Button"
import { useState, useEffect } from 'react'
import { LoaderCircle } from 'lucide-react'

const titleTranslations = {
    login: "Login",
    register: "Register",
}

const subTitleTranslations = {
    login: "Enter your email and password below to login to your account",
    register:
        "Enter your email and password 2 times below to create an account",
}

const submitButtonTranslations = {
    login: "Login",
    register: "Register",
}

interface AuthBlockProps {
    type: "login" | "register"
}

const AuthBlock = (props: AuthBlockProps) => {
    // const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(false)

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')

    const doLogin = () => {
        setLoading(true)
        fetch(
            '/api/auth/login', 
            { 
                method: "POST",
                body: JSON.stringify({ username: username, password: password })
            })
            .then((res) => res.json())
            .then((data) => {
                console.log(data.token)
                setLoading(false)
        })
    }

    const doSubmit = () => {
        doLogin()
    }

    useEffect(() => {
        
    }, [])

    return (
        <div>
            <TabsContent value={props.type}>
                <div className="w-full flex gap-2 flex-col bg-card border-2 border rounded-lg p-6 shadow-sm">
                    <span className="text-1xl font-bold">
                        {titleTranslations[props.type]}
                    </span>
                    <span className="text-1xl pb-3">
                        {subTitleTranslations[props.type]}
                    </span>
                    <TextField
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        className="w-full"
                        type="text"
                        placeholder="Login"
                    />
                    <TextField
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className="w-full"
                        type="password"
                        placeholder="Password"
                    />
                    <TextField
                        value={password2}
                        onChange={e => setPassword2(e.target.value)}
                        className="w-full"
                        type="password"
                        placeholder="Password verification"
                        hidden={props.type == "login"}
                    />
                    <div className="flex flex-col gap-2 grow-1 pt-3">
                        <Button variant="default" onClick={doSubmit}>
                            {submitButtonTranslations[props.type]}
                            <span className="pl-1" hidden={!isLoading}><LoaderCircle/></span>
                        </Button>
                    </div>
                </div>
            </TabsContent>
        </div>
    )
}

export default AuthBlock
