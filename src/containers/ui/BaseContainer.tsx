import { ReactNode, useEffect } from 'react';
import { useAppDispatch } from '../../app/store';
import { fetchBoards } from '../../pages/Boards/Boards.slice';
import { fetchTasks } from '../../pages/Tasks/Tasks.slice';

interface BaseContainerProps {
    children?: ReactNode;
}

export const BaseContainer = ({ children }: BaseContainerProps) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchBoards());
    }, [dispatch]);

    return <div>{children}</div>;
};
