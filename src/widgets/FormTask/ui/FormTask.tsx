import { FormEvent, useState } from 'react';
import { Button, Form, Input, Select } from 'antd';
const { Option } = Select;

interface FormProps {
    className?: string;
}

export const FormTask = ({ className }: FormProps) => {
    const [componentDisabled, setComponentDisabled] = useState<boolean>(true);
    const [priority, setPriority] = useState('');

    const handleSubmitForm = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const formValues = { ...Object.fromEntries(formData) };
        console.log(formValues);
    };

    const handleChange = (value: { value: string }) => {
        console.log(value);
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
            <Form.Item name="taskName">
                <Input placeholder="Название" name="taskName" />
            </Form.Item>

            <Form.Item name="description">
                <Input.TextArea name="description" placeholder="Описание" />
            </Form.Item>

            <Form.Item>
                <Select defaultValue="project" value="project" disabled={componentDisabled}>
                    <Select.Option value="Project">Проект</Select.Option>
                </Select>
            </Form.Item>

            <Form.Item>
                <Select placeholder="Приоритет" onChange={handleChange}>
                    <Option value="High">Высокий</Option>
                    <Option value="Medium">Средний</Option>
                    <Option value="Lower">низкий</Option>
                </Select>
            </Form.Item>

            <Form.Item>
                <Select placeholder="Статус" onChange={handleChange}>
                    <Option value="Todo">To do</Option>
                    <Option value="InProgress">In Progress</Option>
                    <Option value="Done">Done</Option>
                </Select>
            </Form.Item>

            <Form.Item>
                <Select placeholder="Исполнитель" onChange={handleChange}>
                    <Option value="Executor">Я</Option>
                </Select>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Редактировать
                </Button>
            </Form.Item>
        </Form>
    );
};
