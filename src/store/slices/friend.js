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

export const fetchFriend = createAsyncThunk(
    'friend/fetchFriend',
    async (hash, {dispatch}) => {
        try {
            const {data} = await FriendService.fetchFriend();
            dispatch(setFriend(data));
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
    },
    reducers: {

        setFriends(state, {payload}) {
            state.friends = payload;
        },

        addFriend(state, {payload}) {
            state.friends.push(payload);
        },

        setFriend(state, {payload}) {
            state.friend = payload;
        },

        changeFriendStatus(state, {payload}) {
            const {hash, status} = payload;
            const friends = current(state.friends);

            state.friends = friends.map(onlineFriend => {
                if (onlineFriend.friend.hash === hash) {
                    return {...onlineFriend.lastMessage, friend: {...onlineFriend.friend, status}}
                }
                return onlineFriend;
            });
        },

        changeFriendLastMessage(state, {payload}) {
            const {lastMessage} = payload;
            const {hash} = payload.friend;
            const friends = current(state.friends);

            state.friends = friends.map(friend => {
                if (friend.friend.hash === hash) {
                    return {friend: friend.friend, lastMessage};
                }
                return friend;
            });
        }
    }
});

export const {setFriends, addFriend, setFriend, changeFriendStatus, changeFriendLastMessage} = friendSlice.actions;

export default friendSlice.reducer;
