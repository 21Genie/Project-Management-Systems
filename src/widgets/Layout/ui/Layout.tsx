import { NavLink, Outlet, useParams } from 'react-router-dom';
import clsx from 'clsx';

import { useAppDispatch, useAppSelector } from '../../../app/store';
import { fetchBoard } from '../../../pages/Boards/Boards.slice';
import { Task } from '../../Task';
import cls from './Layout.module.css';

const setActive = ({ isActive }: { isActive: boolean }) =>
    isActive ? clsx([cls.active_link, cls.link]) : cls.link;

export const Layout = () => {
    const { users } = useAppSelector((state) => state.userSlice);
    const { id } = useParams();
    const dispatch = useAppDispatch();

    const renderBoard = () => {
        if (id) {
            dispatch(fetchBoard(id));
        }
    };

    return (
        <>
            <header className={cls.header}>
                <div className={cls.wrap_link}>
                    <NavLink className={setActive} to="/issues">
                        Все задачи
                    </NavLink>
                    <NavLink className={setActive} to="/boards">
                        Проекты
                    </NavLink>
                </div>
                <Task
                    title="Создать задачу"
                    isCreateTask={true}
                    users={users}
                    renderBoard={renderBoard}
                />
            </header>

            <Outlet />
        </>
    );
};
