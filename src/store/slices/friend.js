import {createAsyncThunk, createSlice, current} from "@reduxjs/toolkit";
import FriendService from "../../services/FriendService";
import MessageService from "../../services/MessageService";

export const fetchOlderMessages = createAsyncThunk(
    'friend/fetchOlderMessages',
    async (hash, {getState, dispatch}) => {
        try {
            const {allMessagesReceived} = getState().friend;

            if (!allMessagesReceived) {
                const {offset, limit} = getState().friend;
                const {data} = await MessageService.fetchMessages(hash, offset, limit);

                if (data.length >= 1) {
                    dispatch(increaseOffset());
                    dispatch(addMessages(data));
                } else {
                    dispatch(setAllMessagesReceived());
                }
            }
        } catch (e) {
            console.log(e);
        }
    }
);

export const fetchUsersBySearch = createAsyncThunk(
    'friend/fetchUsersBySearch',
    async (search, {dispatch}) => {
        try {
            const {data} = await FriendService.fetchUsersBySearch(search);
            dispatch(setFriends(data));
        } catch (e) {
            console.log(e);
        }
    }
);

export const fetchFriends = createAsyncThunk(
    'friend/fetchFriends',
    async (_, {dispatch}) => {
        try {
            const {data} = await FriendService.fetchFriends();
            dispatch(setFriends(data));
            dispatch(increaseOffset(data));
        } catch (e) {
            console.log(e);
        }
    }
);

export const friendSlice = createSlice({
    name: 'friend',
    initialState: {
        friends: [],
        limit: 40,
        offset: 0,
        isLoaded: false,
        allMessagesReceived: false,
    },
    reducers: {

        setFriends(state, {payload}) {
            state.friends = payload;
        },

        addFriend(state, {payload}) {
            const friendNotFound = state.friends.findIndex(friend => friend.friend.hash === payload.friend.hash) === -1;

            if (friendNotFound) {
                const newFriend = {friend: payload.friend, messages: [payload.lastMessage]};
                state.friends = [...state.friends, newFriend];
            }
        },

        changeFriendStatus(state, {payload}) {
            const {hash, status} = payload;
            const friends = current(state.friends);

            state.friends = friends.map(friend =>
                friend.friend.hash === hash ? {...friend, friend: {...friend.friend, status}} : friend
            );
        },

        changeFriendLastMessage(state, {payload}) {
            const {lastMessage} = payload;
            const {hash} = payload.friend;

            const friends = current(state.friends);

            state.friends = friends.map(friend =>
                friend.friend.hash === hash ? {friend: friend.friend, messages: [...friend.messages, lastMessage]} : friend
            );
        },

        addMessages(state, {payload}) {
            state.friend = {...state, messages: [...payload, ...state.friend.messages]};
        },

        increaseOffset(state) {
            state.offset += 40;
        },

        setAllMessagesReceived(state) {
            state.allMessagesReceived = true;
        },

        setMessageIsRead(state, {payload}) {
            const friendIndex = state.friends.findIndex(friend => friend.friend.hash === payload.hash);

            state.friends[friendIndex].messages = state.friends[friendIndex].messages.map(message =>
                message.id === payload.id ? {...message, isRead: true} : message
            );
        }
    },

    extraReducers: {
        [fetchFriends.fulfilled]: (state) => {
            state.isLoaded = true;
        }
    }

});

export const {
    setFriends,
    addFriend,
    setFriend,
    changeFriendStatus,
    changeFriendLastMessage,
    increaseOffset,
    addMessages,
    setAllMessagesReceived,
    setMessageIsRead
} = friendSlice.actions;

export const getFriendByHash = (state, hash) => {
    return state.friends.find(friend => friend.friend.hash === hash);
};

export default friendSlice.reducer;
