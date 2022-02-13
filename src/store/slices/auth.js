import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import AuthService from "../../services/AuthService";

export const checkAuth = createAsyncThunk(
    'auth/checkAuth',
    async (_, {dispatch}) => {
        try {
            const { data } = await AuthService.refresh();
            localStorage.setItem('token', data.accessToken);
            dispatch(setUser(data.user));
        } catch (e) {
            console.log(e);
        } finally {
            dispatch(setIsLoaded(true));
        }
    });

export const login = createAsyncThunk(
    'auth/login',
    async ({email, password}, {dispatch}) => {
        try{
            const { data } = await AuthService.login(email, password);
            localStorage.setItem('token', data.tokens.accessToken);
            dispatch(setUser(data.user));
        } catch(e) {
            console.log(e);
        }
    }
);

export const logout = createAsyncThunk(
    'auth/logout',
    async (_, {dispatch}) => {
        await AuthService.logout();
        dispatch(removeUser());
    }
);

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        loggedIn: false,
        isLoaded: null,
    },
    reducers: {

        setUser(state, {payload}) {
            state.user = payload;
            state.loggedIn = true;
        },

        changeStatus(state, {payload}) {
            state.user = {...state.user, ...payload};
        },

        removeUser(state) {
            state.user = null;
            state.loggedIn = false;
        },

        setIsLoaded(state, {payload}) {
            state.isLoaded = payload;
        },

    }
});

export const { setUser, setIsLoaded, removeUser, changeStatus } = authSlice.actions;

export default authSlice.reducer;
