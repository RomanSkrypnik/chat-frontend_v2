import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./slices/auth";
import friendReducer from "./slices/friend";

export default configureStore({
    reducer: {
        auth: authReducer,
        friend: friendReducer,
    }
});

