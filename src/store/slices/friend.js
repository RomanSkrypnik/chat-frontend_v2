import {createAsyncThunk, createSlice, current} from "@reduxjs/toolkit";
import FriendService from "../../services/FriendService";

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
)

export const friendSlice = createSlice({
    name: 'friend',
    initialState: {
        friends: [],
        friend: {},
    },
    reducers: {

        setFriends(state, {payload}) {
            state.friends = payload;
            console.log(state.friends)
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
        }
    }
});

export const {setFriends, addFriend, setFriend, changeFriendStatus} = friendSlice.actions;

export default friendSlice.reducer;