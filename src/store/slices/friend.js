import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
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
        },

        addFriend(state, {payload}) {
            state.friends.push(payload);
        },

        setFriend(state, {payload}) {
            state.friend = payload;
        }

    }
});

export const {setFriends, addFriend, setFriend} = friendSlice.actions;

export default friendSlice.reducer;