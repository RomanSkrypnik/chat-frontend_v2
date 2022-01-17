import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./slices/auth";
import friendReducer from "./slices/friend";
import messageReducer from "./slices/message";

export default configureStore({
    reducer: {
        auth: authReducer,
        friend: friendReducer,
        message: messageReducer
    }
});

