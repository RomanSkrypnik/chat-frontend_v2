import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import MessageService from "../../services/MessageService";

export const fetchMessages = createAsyncThunk(
    'message/fetchMessages',
    async (hash, {dispatch, getState}) => {
        const {offset, limit} = getState().message;
        const {data} = await MessageService.fetchMessages(hash, offset, limit);

        dispatch(setMessages(data));
    }
);

export const fetchOlderMessages = createAsyncThunk(
    'message/fetchOlderMessages',
    async (hash, {dispatch, getState}) => {
        const {receivedAll} = getState().message;
        if (!receivedAll) {
            const {offset, limit} = getState().message;
            const {data} = await MessageService.fetchMessages(hash, offset, limit);

            data.length > 0 ? dispatch(addMessages(data)) : dispatch(setReceivedAll());
        }
    }
);

const messageSlice = createSlice({
    name: 'message',
    initialState: {
        messages: [],
        offset: 0,
        limit: 40,
        receivedAll: false,
        newMessage: false
    },
    reducers: {

        setMessages(state, {payload}) {
            state.messages = payload;
            state.offset += 40;
        },

        addMessage(state, {payload}) {
            state.messages = [...state.messages, payload];
            state.offset += 40;
        },

        addMessages(state, {payload}) {
            state.messages = [...state.messages, ...payload];
            state.offset += 40;
        },

        setReceivedAll(state) {
            state.receivedAll = true;
        },

        resetState(state) {
            state.messages = [];
            state.offset = 0;
            state.receivedAll = false;
        }
    },
});

export const {setMessages, addMessage, addMessages, setReceivedAll, resetState} = messageSlice.actions;

export default messageSlice.reducer;
