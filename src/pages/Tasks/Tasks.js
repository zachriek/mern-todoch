import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Loading } from '../../components';
import { BaseLayout } from '../../layouts';
import { baseUrl } from '../../utils/fetchApi';

const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const [tasksLength, setTasksLength] = useState(0);
    const [totalTasks, setTotalTasks] = useState(0);
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [isLoading, setIsLoading] = useState(true);

    const handleDoneInput = async (e, taskData) => {
        let { slug } = taskData;
        try {
            await axios.patch(`${baseUrl}/tasks/${slug}`, {
                ...taskData,
                isCompleted: e.target.checked,
            });
        } catch (err) {
            console.error(err);
        }
    };

    const getTasks = async () => {
        try {
            let response = await axios.get(`${baseUrl}/tasks?page=${page}&perPage=${perPage}`);
            setTasks(response.data.data);
            setTasksLength(response.data.total_data);
            setTotalTasks(Math.ceil(response.data.total_data / perPage));
            setPage(response.data.current_page);
            setPerPage(response.data.per_page);

            setTimeout(() => {
                setIsLoading(false);
            }, 1000);
        } catch (err) {
            console.error(err);
            setTimeout(() => {
                setIsLoading(false);
            }, 1000);
        }
    };

    useEffect(() => {
        getTasks();
    }, [tasks, page]);

    if (isLoading) {
        return <Loading />;
    }

    return (
        <BaseLayout title="All Tasks">
            <section className="tasks my-5 py-5">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="d-flex justify-content-between align-items-center">
                                <h2>All Tasks</h2>
                                <Link to="/tasks/create" className="btn btn-dark shadow-sm">
                                    Create New Task
                                </Link>
                            </div>
                        </div>
                        <div className="col-12 mt-4">
                            <div className="table-responsive">
                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            <th>Title</th>
                                            <th>Completed</th>
                                            <th colSpan="2">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {tasks.map((task, index) => (
                                            <tr className="align-middle" key={task._id}>
                                                <td>{task.title}</td>
                                                <td>{task.isCompleted ? <span className="badge text-bg-success">Completed</span> : <span className="badge text-bg-danger">Uncompleted</span>}</td>
                                                <td>
                                                    {task.isCompleted ? (
                                                        <input
                                                            type="checkbox"
                                                            className="form-check-input"
                                                            id={`isDone-${index + 1}`}
                                                            onChange={(e) => {
                                                                handleDoneInput(e, task);
                                                            }}
                                                            checked
                                                        />
                                                    ) : (
                                                        <input
                                                            type="checkbox"
                                                            className="form-check-input"
                                                            id={`isDone-${index + 1}`}
                                                            onChange={(e) => {
                                                                handleDoneInput(e, task);
                                                            }}
                                                        />
                                                    )}
                                                    <label className="form-check-label mx-2" htmlFor={`isDone-${index + 1}`}>
                                                        Done
                                                    </label>
                                                </td>
                                                <td>
                                                    <Link to={`/tasks/${task.slug}`} className="btn btn-dark btn-sm shadow-sm">
                                                        Details
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    {tasksLength > perPage && (
                        <div className="row mt-4">
                            <div className="col-lg-4 col-md-6">
                                {page > 1 && (
                                    <button type="button" class="btn btn-outline-dark shadow-sm mx-2" onClick={() => setPage(page <= 1 ? page : page - 1)}>
                                        Previous
                                    </button>
                                )}
                                {page < totalTasks && (
                                    <button type="button" class="btn btn-dark shadow-sm" onClick={() => setPage(page >= totalTasks ? page : page + 1)}>
                                        Next
                                    </button>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </BaseLayout>
    );
};

export default Tasks;
