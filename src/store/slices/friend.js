import {createAsyncThunk, createSlice, current} from "@reduxjs/toolkit";
import FriendService from "../../services/FriendService";

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
        isLoaded: false,
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
    },

    extraReducers: {
        [fetchFriends.fulfilled]: (state) => {
            state.isLoaded = true;
        }
    }

});

export const {setFriends, addFriend, setFriend, changeFriendStatus, changeFriendLastMessage} = friendSlice.actions;

export default friendSlice.reducer;
