import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IBoards, IBoard } from '../../type';

type TypeInitialBoardsState = {
    boards: IBoards[];
    board: IBoard[] | null;
    statusBoards: string;
    statusBoard: string;
    error: string | null;
};

const initialBoardsState: TypeInitialBoardsState = {
    boards: [],
    board: null,
    statusBoards: '',
    statusBoard: '',
    error: null,
};

export const fetchBoards = createAsyncThunk(
    'boards/fetchBoards',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch('http://localhost:8080/api/v1/boards');

            if (!response.ok) throw new Error('Server Error!');

            const boards = await response.json();
            return boards;
        } catch (error) {
            return rejectWithValue('Sever Error!');
        }
    },
);

export const fetchBoard = createAsyncThunk(
    'board/fetchBoard',
    async (id: string, { rejectWithValue }) => {
        try {
            const response = await fetch(`http://localhost:8080/api/v1/boards/${id}`);

            if (!response.ok) throw new Error('Server Error!');

            const board = await response.json();

            return board;
        } catch (error) {
            return rejectWithValue('Sever Error!');
        }
    },
);

export const boardsSlice = createSlice({
    name: 'boards',
    initialState: initialBoardsState,
    selectors: {
        selectNameBoard: (state, id) => {
            const board = state.boards.find((board) => board.id === id);
            return board?.name;
        },
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchBoards.pending, (state) => {
            state.statusBoards = 'pending';
            state.error = null;
        });

        builder.addCase(fetchBoards.fulfilled, (state, action) => {
            state.statusBoards = 'fulfilled';
            state.boards = action.payload.data;
        });

        builder.addCase(fetchBoards.rejected, (state, action) => {
            state.statusBoards = 'rejected';
            if (action.error.message) {
                state.error = action.error.message;
            }
        });

        builder.addCase(fetchBoard.pending, (state) => {
            state.statusBoard = 'pending';
            state.error = null;
        });

        builder.addCase(fetchBoard.fulfilled, (state, action) => {
            state.statusBoard = 'fulfilled';
            state.board = action.payload.data;
        });

        builder.addCase(fetchBoard.rejected, (state, action) => {
            state.statusBoard = 'rejected';
            if (action.error.message) {
                state.error = action.error.message;
            }
        });
    },
});
