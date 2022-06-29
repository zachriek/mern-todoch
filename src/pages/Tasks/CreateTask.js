import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Loading } from '../../components';
import { BaseLayout } from '../../layouts';
import { baseUrl } from '../../utils/fetchApi';

const CreateTask = () => {
    const [title, setTitle] = useState('');
    const [slug, setSlug] = useState('');
    const [description, setDescription] = useState('');
    const [isCompleted, setIsCompleted] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();

    const MySwal = withReactContent(Swal);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            let { data } = await axios.post(`${baseUrl}/tasks`, {
                title,
                slug,
                description,
                isCompleted,
            });
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
    };

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    }, []);

    if (isLoading) {
        return <Loading />;
    }

    return (
        <BaseLayout title="Create New Task">
            <section className="create-task my-5 py-5">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-8 col-12">
                            <div className="card border-dark shadow-sm">
                                <div className="card-header bg-dark text-light">Create New Task</div>
                                <div className="card-body">
                                    <form onSubmit={handleSubmit}>
                                        {/* Task Title */}
                                        <div className="mb-4">
                                            <label htmlFor="title" className="form-label">
                                                Task Title
                                            </label>
                                            <input type="text" name="title" id="title" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} />
                                        </div>

                                        {/* Task Slug */}
                                        <div className="mb-4">
                                            <label htmlFor="slug" className="form-label">
                                                Task Slug
                                            </label>
                                            <input type="text" name="slug" id="slug" className="form-control" value={slug} onChange={(e) => setSlug(e.target.value)} />
                                        </div>

                                        {/* Task Description */}
                                        <div className="mb-4">
                                            <label htmlFor="description" className="form-label">
                                                Task Description
                                            </label>
                                            <textarea
                                                className="form-control"
                                                name="description"
                                                id="description"
                                                cols="30"
                                                rows="10"
                                                value={description}
                                                onChange={(e) => setDescription(e.target.value)}
                                            ></textarea>
                                        </div>

                                        {/* Task IsCompleted */}
                                        <div className="mb-5">
                                            <label htmlFor="isCompleted" className="form-label">
                                                Task IsCompleted
                                            </label>
                                            <select className="form-select" id="isCompleted" name="isCompleted" onChange={(e) => setIsCompleted(e.target.value)}>
                                                <option value={false}>Uncompleted</option>
                                                <option value={true}>Completed</option>
                                            </select>
                                        </div>

                                        <hr />

                                        <Link to="/tasks" className="btn btn-outline-dark btn-sm shadow-sm">
                                            Back to tasks
                                        </Link>
                                        <button type="submit" className="btn btn-dark btn-sm shadow-sm mx-2">
                                            Create Task
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </BaseLayout>
    );
};

export default CreateTask;
