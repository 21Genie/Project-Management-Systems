import { Route, Routes } from 'react-router-dom';
import { Flex } from 'antd';
import clsx from 'clsx';

import cls from './app.module.css';
import { Boards } from '../pages/Boards';
import { Layout } from '../widgets/Layout';
import { Board } from '../pages/Board';
import { BaseContainer } from '../containers/ui/BaseContainer';

// BaseContainer
export const App = () => {
    return (
        <BaseContainer>
            <Flex className={cls.wrap} gap="middle" align="center" vertical>
                <Routes>
                    <Route path="/boards" element={<Layout />}>
                        <Route index element={<Boards />} />
                        <Route path="/boards/:id" element={<Board />} />
                    </Route>
                </Routes>
            </Flex>
        </BaseContainer>
    );
};
