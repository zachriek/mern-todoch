import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Loading } from '../../components';
import { BaseLayout } from '../../layouts';
import { baseUrl } from '../../utils/fetchApi';
import { NotFound } from '../../pages';

const Task = () => {
    const [task, setTask] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();

    let { slug } = useParams();

    const MySwal = withReactContent(Swal);

    const getTask = async () => {
        try {
            let { data } = await axios.get(`${baseUrl}/tasks/${slug}`);
            setTask(data);
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

    const deleteTask = async () => {
        let result = await MySwal.fire({
            title: 'Delete the task?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Delete',
            confirmButtonColor: '#212529',
            denyButtonText: `Don't delete`,
        });

        if (result.isConfirmed) {
            try {
                let { data } = await axios.delete(`${baseUrl}/tasks/${slug}`);
                let { message } = data;

                MySwal.fire({
                    icon: 'success',
                    title: <h5>{message}</h5>,
                    confirmButtonColor: '#212529',
                });

                navigate('/tasks');
            } catch (err) {
                console.error(err);
            }
        } else if (result.isDenied) {
            MySwal.fire({
                icon: 'info',
                title: 'Changes are not saved',
                confirmButtonColor: '#212529',
            });
        }
    };

    useEffect(() => {
        getTask();
    }, [slug]);

    if (isLoading) {
        return <Loading />;
    }

    return task ? (
        <BaseLayout title={task.title}>
            <section className="task my-5 py-5">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-8 col-12">
                            <div className="card shadow-sm border-dark">
                                <div className="card-header bg-dark text-light d-flex justify-content-between align-items-center">
                                    {task.title}
                                    <h5 className="card-title">
                                        {task.isCompleted ? <span className="badge text-bg-success">Completed</span> : <span className="badge text-bg-danger">Uncompleted</span>}
                                    </h5>
                                </div>
                                <div className="card-body">
                                    <p className="card-text">{task.description}</p>
                                    <hr />
                                    <div className="d-flex justify-content-between align-items-center">
                                        <Link to="/tasks" className="btn btn-sm btn-outline-dark shadow-sm">
                                            Back to All Tasks
                                        </Link>
                                        <div>
                                            <button type="button" className="btn btn-sm btn-outline-danger shadow-sm mx-2" onClick={deleteTask}>
                                                Delete
                                            </button>
                                            <Link to={`/tasks/${slug}/edit`} className="btn btn-sm btn-dark shadow-sm">
                                                Edit Task
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </BaseLayout>
    ) : (
        <NotFound />
    );
};

export default Task;
