import { configureStore, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import { boardsSlice } from '../pages/Boards/Boards.slice';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { tasksSlice } from '../pages/Tasks/Tasks.slice';

export const store = configureStore({
    reducer: {
        boardsSlice: boardsSlice.reducer,
        tasksSlice: tasksSlice.reducer,
    },
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector = useSelector.withTypes<AppState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppStore = useStore.withTypes<typeof store>();
export const createAppSelector = createSelector.withTypes<AppState>();
export const createAppAsyncThunk = createAsyncThunk.withTypes<{
    state: AppState;
    dispatch: AppDispatch;
}>();
