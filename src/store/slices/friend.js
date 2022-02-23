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
)

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
        friend: {},
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
            const friends = current(state.friends);
            const friend = friends?.filter(friend => {
                return friend.friend.hash === payload.friend.hash;
            });

            if (friend.length < 1) state.friends = [...friends, payload];
        },

        setFriend(state, {payload}) {
            const friends = current(state.friends);

            state.friend = friends.filter(friend => {
                return friend.friend.hash === payload;
            })[0];
        },

        changeFriendStatus(state, {payload}) {
            const {hash, status} = payload;
            const friends = current(state.friends);

            state.friends = friends.map(onlineFriend => {
                if (onlineFriend.friend.hash === hash) {
                    return {lastMessage: onlineFriend.lastMessage, friend: {...onlineFriend.friend, status}}
                }
                return onlineFriend;
            });
        },

        changeFriendLastMessage(state, {payload}) {
            const {lastMessage} = payload;
            const {hash} = payload.friend;

            const friends = current(state.friends);
            const friend = current(state.friend);

            state.friends = friends.map(friend => {
                if (friend.friend.hash === hash) {
                    return {friend: friend.friend, messages: [...friend.messages, lastMessage]};
                }
                return friend;
            });

            const sender = friends.filter(friend => friend.friend.hash === hash)[0];

            if (sender.friend.hash === friend.friend.hash) {
                state.friend = {...sender, messages: [...sender.messages, lastMessage]};
            }
        },

        addMessages(state, {payload}) {
            state.friend = {...state, messages: [...payload, ...state.friend.messages]};
        },

        increaseOffset(state) {
            state.offset += 40;
        },

        setAllMessagesReceived(state) {
            state.allMessagesReceived = true;
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
    setAllMessagesReceived
} = friendSlice.actions;

export default friendSlice.reducer;
