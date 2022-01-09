import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import AuthService from "../../services/AuthService";

export const checkAuth = createAsyncThunk(
    'auth/checkAuth',
    async (_, {dispatch}) => {
        try {
            const { data } = await AuthService.refresh();
            localStorage.setItem('token', data.accessToken);
            dispatch(setUser(data.user));
            dispatch(setLoggedIn(true));
        } catch (e) {
            console.log(e);
        }
    });

export const login = createAsyncThunk(
    'auth/login',
    async ({email, password}, {dispatch}) => {
        try{
            const { data } = await AuthService.login(email, password);
            localStorage.setItem('token', data.tokens.accessToken);
            dispatch(setUser(data.user));
            dispatch(setLoggedIn(true));
        } catch(e) {
            console.log(e);
        }
    }
);

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: {},
        loggedIn: false,
    },
    reducers: {

        setUser(state, {payload}) {
            state.user = payload;
        },

        setLoggedIn(state, {payload}) {
            state.loggedIn = payload;
        }
    }
});

export const { setUser, setLoggedIn } = authSlice.actions;

export default authSlice.reducer;
