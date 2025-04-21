import { Spin } from 'antd';
import { Link } from 'react-router-dom';

import cls from './boards.module.css';
import { useAppSelector } from '../../../app/store';

export const Boards = () => {
    const { boards, error, statusBoards } = useAppSelector((state) => state.boardsSlice);

    return (
        <>
            {statusBoards === 'pending' && <Spin size="large" />}
            {error && <span>Ошибка сервера {error}</span>}
            {boards.length > 0 && (
                <ul className={cls.list}>
                    {boards.map((board) => (
                        <li className={cls.item} key={board.id}>
                            <h3 className={cls.title}>{board.name}</h3>
                            <Link className={cls.link} to={`/boards/${board.id}`}>
                                Перейти к доске
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
};
