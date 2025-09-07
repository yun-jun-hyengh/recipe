import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
    user_idx: number;
    user_name: string;
    nickname: string;
    adminchk: number;
}

interface AuthState {
    accessToken: string | null;
    refreshToken: string | null;
    user: User | null;
}

const initialState: AuthState = {
    accessToken: localStorage.getItem("accessToken"),
    refreshToken: localStorage.getItem("refreshToken"),
    user: localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user")!)
        : null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuth: (state, action: PayloadAction<AuthState>) => {
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
            state.user = action.payload.user;

            if(action.payload.accessToken) {
                localStorage.setItem("accessToken", action.payload.accessToken);
            }
            if(action.payload.refreshToken) {
                localStorage.setItem("refreshToken", action.payload.refreshToken);
            }
            if(action.payload.user) {
                localStorage.setItem("user", JSON.stringify(action.payload.user));
            }
        },
        logout: (state) => {
            state.accessToken = null;
            state.refreshToken = null;
            state.user = null;

            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("user");
        },
    },
});

export const { setAuth, logout } = authSlice.actions;
export default authSlice.reducer;