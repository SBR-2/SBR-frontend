import { defineStore } from "pinia";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
    exp: number;
}

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        accessToken: localStorage.getItem("accessToken") as string | null,
        rolUsuario: localStorage.getItem("rolUsuario") as string | null,
        userId: localStorage.getItem("userId") as string | null
    }),
    actions: {
        login(token: string) {
            this.accessToken = token;
            localStorage.setItem("accessToken", token);
        },
        logout() {
            this.accessToken = null;
            localStorage.removeItem("accessToken");

            this.rolUsuario = null;
            localStorage.removeItem("rolUsuario");
        },
        setRole(rol: string) {
            this.rolUsuario = rol;
            localStorage.setItem("rolUsuario", rol);
        },
        setUserId(userId: string) {
            this.userId = userId;
            localStorage.setItem("userId", userId);
        }
    },
    getters: {
        getAccessToken(): string | null {
            return this.accessToken;
        },
        isAuthenticated(): boolean {
            if (this.accessToken !== null) {
                // Verificar que el token no esté expirado
                try {
                    const decoded = jwtDecode<JwtPayload>(this.accessToken);
                    const currentTime = Math.floor(Date.now() / 1000);
                    return decoded.exp > currentTime;
                } catch (error) {
                    console.error("Invalid token:", error);
                    return false;
                }
            }

            return false;
        },
        getRole(): string | null {
            return this.rolUsuario;
        },
        getUserId(): string | null {
            return this.userId;
        }
    },
});