import {configureStore} from "@reduxjs/toolkit";
import {tasksReducer} from './slices/tasks'
import {authReducer} from './slices/auth'

const store = configureStore({
    reducer: {
        tasks: tasksReducer,
        auth: authReducer,
    },
});

export default store;