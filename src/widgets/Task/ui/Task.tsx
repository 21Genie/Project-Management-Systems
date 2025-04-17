import { useState } from 'react';
import { Drawer } from 'antd';

import cls from './task.module.css';
import { FormTask } from '../../FormTask/ui/FormTask';
import { IBoard } from '../../../type';

interface ITask {
    title: string;
    task: IBoard;
}

export const Task = ({ title }: ITask) => {
    const [open, setOpen] = useState(false);

    const showDrawer = () => setOpen(true);
    const onClose = () => setOpen(false);

    return (
        <>
            <button className={cls.button} onClick={showDrawer}>
                {title}
            </button>
            <Drawer title="Редактирование задачи" onClose={onClose} open={open}>
                <FormTask />
            </Drawer>
        </>
    );
};
