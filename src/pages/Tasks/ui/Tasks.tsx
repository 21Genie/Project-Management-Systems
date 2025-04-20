import { ChangeEvent, useEffect, useState } from 'react';
import { Select } from 'antd';
import Search from 'antd/es/input/Search';

import { useAppDispatch, useAppSelector } from '../../../app/store';
import cls from './tasks.module.css';
import { ITask } from '../../../type';
import { fetchTasks } from '../Tasks.slice';

const filterTasksByTitle = (tasks: ITask[], searchQuery: string) => {
    if (!searchQuery) return tasks;

    return tasks.filter(({ title }) =>
        title.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase()),
    );
};

const filterTasksByStatus = (tasks: ITask[], tasksStatus: string) => {
    if (!tasksStatus) return tasks;

    return tasks.filter(
        ({ status }) => status.toLocaleLowerCase() === tasksStatus.toLocaleLowerCase(),
    );
};

type TaskStatusFilter = 'Done' | 'InProgress' | 'Backlog' | 'All';
type TaskStatusFilterOption = {
    value: TaskStatusFilter;
    label: string;
};

const tasksStatusFilterOptions: TaskStatusFilterOption[] = [
    { value: 'All', label: 'All tasks' },
    { value: 'Backlog', label: 'To do' },
    { value: 'InProgress', label: 'In progress' },
    { value: 'Done', label: 'Done' },
];

export const Tasks = () => {
    const { tasks } = useAppSelector((state) => state.tasksSlice);
    const [searchQuery, setSearchQuery] = useState('');
    const [tasksStatus, setTasksStatus] = useState<TaskStatusFilter>('All');

    const dispatch = useAppDispatch();

    const handleTasksStatusSelectChange = (value: string) => {
        setTasksStatus(value as TaskStatusFilter);
    };

    const handleInputValue = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchQuery(value);
    };

    const getFinalTasks = () => {
        let result = tasks;

        if (searchQuery.length > 0) {
            result = filterTasksByTitle(result, searchQuery);
        }

        if (tasksStatus !== 'All') {
            result = filterTasksByStatus(result, tasksStatus);
        }

        return result;
    };

    useEffect(() => {
        dispatch(fetchTasks());
    }, []);

    return (
        <div className={cls.issues}>
            <div className={cls.wrap}>
                <Search
                    className={cls.search}
                    placeholder="Посик"
                    allowClear
                    size="large"
                    value={searchQuery}
                    onChange={handleInputValue}
                />
                <Select
                    className={cls.filter}
                    defaultValue="Фильтр"
                    size="large"
                    style={{ width: 120 }}
                    onChange={handleTasksStatusSelectChange}
                    options={tasksStatusFilterOptions}
                />
            </div>

            <ul className={cls.tasks}>
                {getFinalTasks().map((task) => (
                    <li className={cls.task} key={task.id}>
                        {task.title}
                    </li>
                ))}
            </ul>
        </div>
    );
};
