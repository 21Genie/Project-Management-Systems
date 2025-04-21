import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IUsers } from '../../type';

type TypeInitialUsersState = {
    users: IUsers[];
    statusUsers: string;
    error: string | null;
};

export const fetchUsers = createAsyncThunk('users/fetchUsers', async (_, { rejectWithValue }) => {
    try {
        const response = await fetch(`http://localhost:8080/api/v1/users`);

        if (!response.ok) throw new Error('Server Error!');

        const users = await response.json();

        return users;
    } catch (error) {
        return rejectWithValue('Sever Error!');
    }
});

const initialTasksState: TypeInitialUsersState = {
    users: [],
    statusUsers: '',
    error: null,
};

export const userSlice = createSlice({
    name: 'users',
    initialState: initialTasksState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(fetchUsers.pending, (state) => {
            state.statusUsers = 'pending';
            state.error = null;
        });

        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.statusUsers = 'fulfilled';
            state.users = action.payload.data;
        });

        builder.addCase(fetchUsers.rejected, (state, action) => {
            state.statusUsers = 'rejected';
            if (action.error.message) {
                state.error = action.error.message;
            }
        });
    },
});
