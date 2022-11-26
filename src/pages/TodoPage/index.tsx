import React from 'react';

import { TodoList } from '~/src/components';
import EntityPage from '~/src/components/EntityPage';

const TodoPage = () => (
    <EntityPage pageName="TodoPage" Component={<TodoList />} />
);

export default TodoPage;
