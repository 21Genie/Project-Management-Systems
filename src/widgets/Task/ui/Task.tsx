import { useState } from 'react';
import { Button, Drawer } from 'antd';

import { FormTask } from '../../FormTask/ui/FormTask';
import { IBoardTask, IUsers } from '../../../type';
import cls from './task.module.css';

interface ITaskProps {
    title: string;
    task?: IBoardTask;
    isCreateTask?: boolean;
    isGoToBoard?: boolean;
    taskBoardId?: number;
    users?: IUsers[];
    renderBoard?: () => void;
}

export const Task = ({
    title,
    task,
    isCreateTask,
    isGoToBoard,
    taskBoardId,
    users,
    renderBoard,
}: ITaskProps) => {
    const [open, setOpen] = useState(false);

    const titleFormTask = isCreateTask ? 'Создание задачи' : 'Редактирование задачи';
    const classButton = isCreateTask ? cls.button_create : cls.button;

    const showDrawer = () => setOpen(true);
    const onClose = () => setOpen(false);

    return (
        <>
            {isCreateTask ? (
                <Button className={cls.button_create} onClick={showDrawer}>
                    {title}
                </Button>
            ) : (
                <button className={classButton} onClick={showDrawer}>
                    {title}
                </button>
            )}
            <Drawer title={titleFormTask} onClose={onClose} open={open}>
                <FormTask
                    task={task}
                    isCreateTask={isCreateTask}
                    onClose={onClose}
                    isGoToBoard={isGoToBoard}
                    taskBoardId={taskBoardId}
                    users={users}
                    renderBoard={renderBoard}
                />
            </Drawer>
        </>
    );
};
