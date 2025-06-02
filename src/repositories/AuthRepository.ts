interface User {
    username: string
    password: string
    token: string
}

interface AuthRepository {
    register: (username: string, password: string) => Promise<User | null>
    login: (username: string, password: string) => Promise<User | null>
    identifyUser: (token: string) => Promise<User | null>
}

class AuthRepositoryImpl implements AuthRepository {
    async register(username: string, password: string) {
        return { username, password, token: "s78df6a678fasd8776dsa4545f" }
    }

    async login(username: string, password: string) {
        return { username, password, token: "s78df6a678fasd8776dsa4545f" }
    }

    async identifyUser(token: string) {
        return { username: "test", password: "<PASSWORD>", token }
    }
}

const createAuthRepository = (): AuthRepository => new AuthRepositoryImpl()

export { createAuthRepository }
export type { AuthRepository, User }
