import { defineStore } from "pinia";

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        accessToken: JSON.parse(localStorage.getItem("accessToken") || "null") as string | null,
    }),
    actions: {
        login(token: string) {
            this.accessToken = token;
            localStorage.setItem("accessToken", JSON.stringify(token));
        },
        logout() {
            this.accessToken = null;
            localStorage.removeItem("accessToken");
        }
    },
    getters: {
        getAccessToken(): string | null {
            return this.accessToken;
        },
        isAuthenticated(): boolean {
            // TODO: Decodificar el token y verificar si es válido (expirado o no)
            return this.accessToken !== null; // Retornar true si el token está presente
        }
    },
});