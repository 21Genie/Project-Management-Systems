import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../../app/store';
import { fetchBoard } from '../../Boards/Boards.slice';
import { Task } from '../../../widgets/Task';
import cls from './board.module.css';

export const Board = () => {
    const { board } = useAppSelector((state) => state.boardsSlice);
    const { boards } = useAppSelector((state) => state.boardsSlice);

    const dispatch = useAppDispatch();

    const { id } = useParams();

    const nameBoard = boards.find((board) => board.id === Number(id));

    const statusBacklog = board?.filter((tasks) => tasks.status === 'Backlog');
    const statusInProgress = board?.filter((tasks) => tasks.status === 'InProgress');
    const statusDone = board?.filter((tasks) => tasks.status === 'Done');

    useEffect(() => {
        if (id) {
            dispatch(fetchBoard(id));
        }
    }, [dispatch]);

    const renderBoard = () => {
        if (id) {
            dispatch(fetchBoard(id));
        }
    };

    return (
        <>
            <h2 className={cls.title_board}>{nameBoard?.name}</h2>
            <div className={cls.kanban}>
                <div className={cls.column}>
                    <h3 className={cls.title}>To do</h3>
                    <ul className={cls.list}>
                        {statusBacklog?.map((task) => (
                            <li className={cls.task} key={task.id}>
                                <Task
                                    title={task.title}
                                    task={task}
                                    isCreateTask={false}
                                    renderBoard={renderBoard}
                                />
                            </li>
                        ))}
                    </ul>
                </div>
                <div className={cls.column}>
                    <h3 className={cls.title}>In progress</h3>
                    <ul className={cls.list}>
                        {statusInProgress?.map((task) => (
                            <li className={cls.task} key={task.id}>
                                <Task title={task.title} task={task} renderBoard={renderBoard} />
                            </li>
                        ))}
                    </ul>
                </div>
                <div className={cls.column}>
                    <h3 className={cls.title}>Done</h3>
                    <ul className={cls.list}>
                        {statusDone?.map((task) => (
                            <li className={cls.task} key={task.id}>
                                <Task title={task.title} task={task} renderBoard={renderBoard} />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
};
