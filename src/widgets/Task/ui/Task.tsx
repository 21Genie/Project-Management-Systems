import { useState } from 'react';
import { Button, Drawer } from 'antd';

import cls from './task.module.css';
import { FormTask } from '../../FormTask/ui/FormTask';
import { IBoardTask } from '../../../type';

interface ITask {
    title: string;
    task?: IBoardTask;
    isCreateTask?: boolean;
}

export const Task = ({ title, task, isCreateTask }: ITask) => {
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
                <FormTask task={task} isCreateTask onClose={onClose} />
            </Drawer>
        </>
    );
};
