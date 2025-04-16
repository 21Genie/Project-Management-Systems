import { createBrowserRouter, Link, Outlet } from 'react-router-dom';
import { Button } from 'antd';

export const appRouter = createBrowserRouter([
    {
        path: '/',
        element: (
            <div>
                <header>
                    <Link to="/from">Все задачи</Link>
                    <Link to="/from">Все задачи</Link>
                    <Link to="/from">
                        <Button>Создать задачу</Button>
                    </Link>
                </header>
                <Outlet />
            </div>
        ),
    },
]);
