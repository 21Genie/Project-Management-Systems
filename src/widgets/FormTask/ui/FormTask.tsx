import { FormEvent, useEffect, useState } from 'react';
import { Button, Flex, Form, Input, Select } from 'antd';
import { Link } from 'react-router-dom';

import { IBoardTask, ITask, ITaskCreate, ITaskUpdate, IUsers } from '../../../type';
import { useAppDispatch, useAppSelector } from '../../../app/store';
import { updateTask } from '../../../pages/Boards/Boards.slice';
import { createTask } from '../../../pages/Tasks/Tasks.slice';
const { Option } = Select;

interface FormProps {
    onClose: () => void;
    isCreateTask?: boolean;
    task?: IBoardTask;
    isGoToBoard?: boolean;
    taskBoardId?: number;
    tasks?: ITask[];
    users?: IUsers[];
    renderBoard?: () => void;
}

export const FormTask = ({
    task,
    isCreateTask,
    onClose,
    isGoToBoard,
    taskBoardId,
    users,
    renderBoard,
}: FormProps) => {
    const [priority, setPriority] = useState(task?.priority);
    const [status, setStatus] = useState(task?.status);
    const [assigneeId, setAssigneeId] = useState(task?.assignee.id);
    const [boardId, setBoardId] = useState<number>();

    const { boards } = useAppSelector((state) => state.boardsSlice);

    const dispatch = useAppDispatch();

    const handleSubmitForm = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const { title, description } = { ...Object.fromEntries(formData) };

        if (!isCreateTask) {
            if (assigneeId) {
                const updateFormTask: ITaskUpdate = {
                    title: String(title),
                    description: String(description),
                    priority,
                    status,
                    assigneeId,
                };

                if (task) {
                    dispatch(updateTask({ updateFormTask, taskId: task.id }));
                }

                if (renderBoard) {
                    setTimeout(() => {
                        renderBoard();
                    }, 90);
                }
            }
        }
        if (isCreateTask) {
            if (assigneeId && boardId) {
                const newTask: ITaskCreate = {
                    title: String(title),
                    description: String(description),
                    assigneeId,
                    boardId,
                    priority,
                };

                dispatch(createTask(newTask));
                if (renderBoard) {
                    setTimeout(() => {
                        renderBoard();
                    }, 90);
                }
            }
        }
    };

    const handleChange = (value: string | number, setField) => {
        setField(value);
    };

    return (
        <Form
            onSubmitCapture={handleSubmitForm}
            labelCol={{ flex: '110px' }}
            labelAlign="left"
            labelWrap
            wrapperCol={{ flex: 1 }}
            colon={false}
            style={{ maxWidth: 600 }}
        >
            <Form.Item name="title" initialValue={task?.title}>
                <Input placeholder="Название" name="title" />
            </Form.Item>

            <Form.Item name="description" initialValue={task?.description}>
                <Input.TextArea name="description" placeholder="Описание" />
            </Form.Item>

            <Form.Item>
                <Select
                    placeholder="Проект"
                    disabled={!isCreateTask}
                    onChange={(value: number) => handleChange(value, setBoardId)}
                >
                    {boards.map((board) => (
                        <Option key={board.id} value={board.id}>
                            {board.name}
                        </Option>
                    ))}
                </Select>
            </Form.Item>

            <Form.Item>
                <Select
                    value={priority}
                    placeholder="Приоритет"
                    onChange={(value: string) => handleChange(value, setPriority)}
                >
                    <Option value="High">Высокий</Option>
                    <Option value="Medium">Средний</Option>
                    <Option value="Low">низкий</Option>
                </Select>
            </Form.Item>

            <Form.Item>
                <Select
                    placeholder="Статус"
                    value={status}
                    onChange={(value) => handleChange(value, setStatus)}
                >
                    <Option value="Backlog">To do</Option>
                    <Option value="InProgress">In Progress</Option>
                    <Option value="Done">Done</Option>
                </Select>
            </Form.Item>

            <Form.Item>
                <Select
                    value={task?.assignee.fullName}
                    placeholder="Исполнитель"
                    onChange={(value: number | string) =>
                        handleChange(Number(value), setAssigneeId)
                    }
                >
                    {users?.map((user) => (
                        <Option key={user.id} value={user.id}>
                            {user.fullName}
                        </Option>
                    ))}
                </Select>
            </Form.Item>

            <Form.Item>
                {isGoToBoard ? (
                    <Flex gap="middle">
                        <Link to={`/boards/${taskBoardId}`}>Перейти на доску</Link>
                        <Button type="primary" htmlType="submit" onClick={onClose}>
                            Редактировать
                        </Button>
                    </Flex>
                ) : (
                    <Button
                        type="primary"
                        htmlType="submit"
                        onClick={() => {
                            onClose();
                        }}
                    >
                        {isCreateTask ? 'Создать' : 'Редактировать'}
                    </Button>
                )}
            </Form.Item>
        </Form>
    );
};
