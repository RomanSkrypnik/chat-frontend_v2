import {createAsyncThunk, createSlice, current} from "@reduxjs/toolkit";
import MessageService from "../../services/MessageService";

export const fetchMessages = createAsyncThunk(
    'message/fetchMessages',
    async (hash, {dispatch, getState}) => {
        const {offset, limit} = getState().message;
        const {data} = await MessageService.fetchMessages(hash, offset, limit);
        dispatch(setMessages(data));
        dispatch(increaseOffset());
    }
);

export const fetchOlderMessages = createAsyncThunk(
    'message/fetchOlderMessages',
    async (hash, {dispatch, getState}) => {
        const {offset, limit} = getState().message;
        const {data} = await MessageService.fetchMessages(hash, offset, limit);
        dispatch(increaseOffset());
    }
);

export const sendMessage = createAsyncThunk(
    'message/sendMessage',
    async ({hash, message}, {dispatch}) => {
        const {data} = await MessageService.sendMessage(hash, message);
        dispatch(addMessage(data));
    }
);

const messageSlice = createSlice({
    name: 'message',
    initialState: {
        messages: [],
        offset: 0,
        limit: 40,
    },
    reducers: {

        setMessages(state, {payload}) {
            state.messages = payload;
        },

        addMessage(state, {payload}) {
            state.messages = [...state.messages, payload];
        },

        increaseOffset(state) {
            state.offset += 40;
        },

        resetOffset(state) {
            state.offset = 0;
        }

    }
});

export const {setMessages, addMessage, increaseOffset, resetOffset} = messageSlice.actions;

export default messageSlice.reducer;
