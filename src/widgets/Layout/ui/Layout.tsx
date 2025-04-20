import { NavLink, Outlet } from 'react-router-dom';
import clsx from 'clsx';
import { Button } from 'antd';
import cls from './Layout.module.css';
import { Task } from '../../Task';

const setActive = ({ isActive }: { isActive: boolean }) =>
    isActive ? clsx([cls.active_link, cls.link]) : cls.link;

export const Layout = () => {
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
                <Task title="Создать задачу" isCreateTask={true} />
            </header>

            <Outlet />
        </>
    );
};
