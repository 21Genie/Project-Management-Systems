import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ITask, ITaskCreate } from '../../type';

type TypeInitialTasksState = {
    tasks: ITask[];
    statusTasks: string;
    error: string | null;
};

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async (_, { rejectWithValue }) => {
    try {
        const response = await fetch(`http://localhost:8080/api/v1/tasks`);

        if (!response.ok) throw new Error('Server Error!');

        const tasks = await response.json();

        return tasks;
    } catch (error) {
        return rejectWithValue('Sever Error!');
    }
});

export const createTask = createAsyncThunk(
    'tasks/createTask',
    async (newTask: ITaskCreate, { rejectWithValue }) => {
        try {
            const response = await fetch('http://localhost:8080/api/v1/tasks/create', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(newTask),
            });

            if (!response.ok) throw new Error('Server Error!');
        } catch (error) {
            return rejectWithValue('Sever Error!');
        }
    },
);

const initialTasksState: TypeInitialTasksState = {
    tasks: [],
    statusTasks: '',
    error: null,
};

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState: initialTasksState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(fetchTasks.pending, (state) => {
            state.statusTasks = 'pending';
            state.error = null;
        });

        builder.addCase(fetchTasks.fulfilled, (state, action) => {
            state.statusTasks = 'fulfilled';
            state.tasks = action.payload.data;
        });

        builder.addCase(fetchTasks.rejected, (state, action) => {
            state.statusTasks = 'rejected';
            if (action.error.message) {
                state.error = action.error.message;
            }
        });
    },
});
