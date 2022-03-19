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
                    dispatch(addOlderMessages(data));
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

export const fetchFriend = createAsyncThunk(
    'friend/fetchFriend',
    async (hash, {dispatch}) => {
        const {data} = await FriendService.fetchFriend(hash);

        dispatch(setFriend(data));
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

        setFriend(state, {payload}) {
            state.friend = payload;
        },

        addFriend(state, {payload}) {
            const {friend, newMessages} = payload;

            const friendNotFound = state.friends.findIndex(friend => friend.friend.hash === payload.friend.hash) === -1;

            if (friendNotFound) {
                state.friends = [...state.friends, {friend, messages: newMessages}];
            }
        },

        addNewMessage(state, {payload}) {
            const {newMessage} = payload;
            const {hash} = payload.friend;

            state.friends = state.friends.map(friend => {
                    if (friend.friend.hash === hash) {
                        return {friend: friend.friend, messages: [...friend.messages, newMessage]}
                    }
                    return friend;
                }
            );

            if (state.friend.friend.hash === hash) {
                state.friend = {friend: state.friend.friend, messages: [...state.friend.messages, newMessage]};
            }
        },

        addNewMessages(state, {payload}) {
            const {friend, newMessages} = payload;
            const friendHash = friend.hash;

            state.friends = state.friends.map(friend => {
                if (friend.friend.hash === friendHash) {
                    return {...friend, messages: [...friend.messages, ...newMessages]}
                }
                return friend;
            });

            if (friendHash === state.friend.friend.hash) {
                state.friend = {...state.friend, messages: [...state.friend.messages, ...newMessages]};
            }
        },

        addOlderMessages(state, {payload}) {
            state.friend = {...state.friend, messages: [...state.friend.messages, ...payload]};
        },

        changeFriendStatus(state, {payload}) {
            const {hash, status} = payload;
            const friends = current(state.friends);

            state.friends = friends.map(friend =>
                friend.friend.hash === hash ? {...friend, friend: {...friend.friend, status}} : friend
            );

            if (state.friend.hash === hash) {
                state.friend = {...state.friend, friend: {...state.friend.friend, status}};
            }
        },

        increaseOffset(state) {
            state.offset += 40;
        },

        setAllMessagesReceived(state) {
            state.allMessagesReceived = true;
        },

        setMessageIsRead(state, {payload}) {
            const {id, hash} = payload;

            const friendIndex = state.friends.findIndex(friend => friend.friend.hash === hash);

            state.friends[friendIndex].messages = state.friends[friendIndex].messages.map(message =>
                message.id === id ? {...message, isRead: true} : message
            );

            if (state.friend.friend.hash === hash) {
                state.friend.messages = state.friend.messages.map(message => {
                    if (message.id === id) return {...message, isRead: true};
                    return message;
                })
            }
        },

        setMessageIsStarred(state, {payload}) {
            const {id, hash, user} = payload;

            const index = state.friends.findIndex(friend => friend.friend.hash === hash);

            state.friends[index].messages = state.friends[index].messages.map(message => {
                if (message.id === id) {
                    return message.sender.hash === user.hash
                        ? {...message, starredBySender: true}
                        : {...message, starredByReceiver: true};
                }
                return message;
            });

            if (state.friend.friend.hash === state.friends[index].friend.hash) {
                state.friend.messages = state.friend.messages.map(message => {
                    if (message.id === id) {
                        return message.sender.hash === user.hash
                            ? {...message, starredBySender: true}
                            : {...message, starredByReceiver: true}
                    }
                    return message;
                });
            }
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
    setFriend,
    addFriend,
    changeFriendStatus,
    addNewMessage,
    addNewMessages,
    increaseOffset,
    addOlderMessages,
    setAllMessagesReceived,
    setMessageIsRead,
    setMessageIsStarred
} = friendSlice.actions;

export const getFriendByHash = (state, hash) => {
    return state.friends.find(friend => friend.friend.hash === hash);
};

export default friendSlice.reducer;
