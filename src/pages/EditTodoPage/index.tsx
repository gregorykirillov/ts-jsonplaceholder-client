import React from 'react';
import { useParams } from 'react-router-dom';
import { EditTodoComponent } from '~/src/components';

const EditTodoPage = () => {
    const todoId = Number(useParams().id);

    return (
        <>
            <h2>Изменение задачи</h2>

            <EditTodoComponent todoId={todoId} />
        </>
    );
};

export default EditTodoPage;
