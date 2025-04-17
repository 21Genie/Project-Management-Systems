import { NavLink, Outlet } from 'react-router-dom';
import clsx from 'clsx';
import { Button } from 'antd';
import cls from './Layout.module.css';

const setActive = ({ isActive }: { isActive: boolean }) =>
    isActive ? clsx([cls.active_link, cls.link]) : cls.link;

export const Layout = () => {
    return (
        <>
            <header className={cls.header}>
                <NavLink className={setActive} to="/boards/:id">
                    Все задачи
                </NavLink>
                <NavLink className={setActive} to="/boards">
                    Проекты
                </NavLink>
                <Button value="small">Создать задачу</Button>
            </header>

            <Outlet />
        </>
    );
};
