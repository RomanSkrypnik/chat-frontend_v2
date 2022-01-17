import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import MessageService from "../../services/MessageService";

export const fetchMessages = createAsyncThunk(
    'message/fetchMessages',
    async (hash, {dispatch, getState}) => {
        const { offset, limit } = getState().message;
        const { data } = await MessageService.fetchMessages(hash, offset, limit);
        dispatch(setMessages(data));
    }
);

export const sendMessage = createAsyncThunk(
    'message/sendMessage',
    async ({hash, message}, {dispatch}) => {
        const { data } = await MessageService.sendMessage(hash, message);
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
            state.messages.push(payload);
        }

    }
});

export const { setMessages, addMessage } = messageSlice.actions;

export default messageSlice.reducer;