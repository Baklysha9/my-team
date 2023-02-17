import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {baseURL} from "../../constants/constants";

export const fetchTasks = createAsyncThunk('tasks/fetchPosts', async () => {
     const {data} = await axios.get(baseURL+'/tasks');
     return data;
})

export const fetchProjects = createAsyncThunk('tasks/fetchProjects', async () => {
    const {data} = await axios.get(baseURL+'/projects');
    return data;
})

const initialState = {
    tasks: {
       items: [],
       status: 'loading',
    },
    projects: {
        items: [],
        status: 'loading',
    },
};

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchTasks.pending]: (state) => {
            state.tasks.items = [];
            state.tasks.status = 'loading';
        },
        [fetchTasks.fulfilled]: (state,actions) => {
            state.tasks.items = actions.payload;
            state.tasks.status = 'loaded';
        },
        [fetchTasks.rejected]: (state) => {
            state.tasks.items = [];
            state.tasks.status = 'error';
        },

        [fetchProjects.pending]: (state) => {
            state.projects.items = [];
            state.projects.status = 'loading';
        },
        [fetchProjects.fulfilled]: (state,actions) => {
            state.projects.items = actions.payload;
            state.projects.status = 'loaded';
        },
        [fetchProjects.rejected]: (state) => {
            state.projects.items = [];
            state.projects.status = 'error';
        },
    }
});

export const tasksReducer = tasksSlice.reducer;