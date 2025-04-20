import { FormEvent, useState } from 'react';
import { Button, Form, Input, Select } from 'antd';
import { IBoardTask } from '../../../type';
import { useAppDispatch } from '../../../app/store';
import { updateTask } from '../../../pages/Boards/Boards.slice';
const { Option } = Select;

interface FormProps {
    onClose: () => void;
    isCreateTask?: boolean;
    task?: IBoardTask;
}

export const FormTask = ({ task, isCreateTask, onClose }: FormProps) => {
    const [componentDisabled, setComponentDisabled] = useState<boolean>(true);
    const [priority, setPriority] = useState(task?.priority);
    const [status, setStatus] = useState(task?.status);
    const [executor, setExecutor] = useState('');

    const dispatch = useAppDispatch();

    const handleSubmitForm = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        if (!isCreateTask) {
            const updateFormTask = {
                ...Object.fromEntries(formData),
                priority,
                status,
                executor,
                assigneeId: task?.assignee.id,
            };

            dispatch(updateTask({ task, updateFormTask, taskId: task?.id }));
        }

        const createTask = {
            ...Object.fromEntries(formData),
            assigneeId: task?.assignee.id,
            title: task?.title,
            priority,
            status,
        };
        console.log(createTask);
    };

    const handleChange = (value: string, setField: (field: string) => void) => {
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
                <Select defaultValue="project" value="Проект" disabled={componentDisabled}>
                    <Select.Option value="Project">Проект</Select.Option>
                </Select>
            </Form.Item>

            <Form.Item>
                <Select
                    placeholder="Приоритет"
                    value={task?.priority}
                    onChange={(value) => handleChange(value, setPriority)}
                >
                    <Option value="High">Высокий</Option>
                    <Option value="Medium">Средний</Option>
                    <Option value="Lower">низкий</Option>
                </Select>
            </Form.Item>

            <Form.Item>
                <Select
                    value={task?.status}
                    placeholder="Статус"
                    onChange={(value) => handleChange(value, setStatus)}
                >
                    <Option value="Backlog">To do</Option>
                    <Option value="InProgress">In Progress</Option>
                    <Option value="Done">Done</Option>
                </Select>
            </Form.Item>

            <Form.Item>
                <Select
                    placeholder="Исполнитель"
                    onChange={(value) => handleChange(value, setExecutor)}
                >
                    <Option value="i">Я</Option>
                </Select>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" onClick={onClose}>
                    {isCreateTask ? 'Создать' : 'Редактировать'}
                </Button>
            </Form.Item>
        </Form>
    );
};
