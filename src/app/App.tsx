import { Route, Routes } from 'react-router-dom';
import { Flex } from 'antd';

import { Boards } from '../pages/Boards';
import { Layout } from '../widgets/Layout';
import { Board } from '../pages/Board';
import { BaseContainer } from '../containers/ui/BaseContainer';
import { Tasks } from '../pages/Tasks';
import cls from './app.module.css';

export const App = () => {
    return (
        <BaseContainer>
            <Flex className={cls.wrap} gap="middle" align="center" vertical>
                <Routes>
                    <Route path="/boards" element={<Layout />}>
                        <Route index element={<Boards />} />
                        <Route path="/boards/:id" element={<Board />} />
                    </Route>
                    <Route path="/issues" element={<Layout />}>
                        <Route index element={<Tasks />} />
                    </Route>
                </Routes>
            </Flex>
        </BaseContainer>
    );
};
