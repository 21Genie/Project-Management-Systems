import { ReactNode, useEffect } from 'react';
import { useAppDispatch } from '../../app/store';
import { fetchBoards } from '../../pages/Boards/Boards.slice';
import { fetchUsers } from '../../widgets/Users/user.slice';

interface BaseContainerProps {
    children?: ReactNode;
}

export const BaseContainer = ({ children }: BaseContainerProps) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchBoards());
        dispatch(fetchUsers());
    }, [dispatch]);

    return <div>{children}</div>;
};
