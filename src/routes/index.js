import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { CreateTask, EditTask, Home, NotFound, Task, Tasks } from '../pages';

const Router = () => {
    return (
        <Routes>
            {/* Home Route */}
            <Route exact path="/" element={<Home />} />

            {/* Task Routes */}
            <Route exact path="/tasks" element={<Tasks />} />
            <Route exact path="/tasks/create" element={<CreateTask />} />
            <Route exact path="/tasks/:slug" element={<Task />} />
            <Route exact path="/tasks/:slug/edit" element={<EditTask />} />

            {/* Not Found */}
            <Route exact path="*" element={<NotFound />} />
        </Routes>
    );
};

export default Router;
