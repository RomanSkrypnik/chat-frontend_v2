import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        accessToken: "",
        refreshToken: "",
        user: {},
        loggedIn: false,
    },
    reducers: {

        setAccessToken(state, payload) {
            state.accessToken = payload;
        },

        setRefreshToken(state, payload) {
            state.refreshToken = payload;
        },

        setUser(state, payload) {
            state.user = payload;
        },

        setLoggedIn(state, payload) {
            state.loggedIn = payload;
        }
    }
});

export const { setAccessToken, setRefreshToken, setUser, setLoggedIn } = authSlice.actions;

export default authSlice.reducer;