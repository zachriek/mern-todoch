import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Loading } from '../../components';
import { BaseLayout } from '../../layouts';
import { baseUrl } from '../../utils/fetchApi';
import NotFound from '../NotFound/NotFound';

const EditTask = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isCompleted, setIsCompleted] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    let { slug } = useParams();
    const [taskSlug, setTaskSlug] = useState(slug);

    const navigate = useNavigate();

    const MySwal = withReactContent(Swal);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            let { data } = await axios.patch(`${baseUrl}/tasks/${slug}`, {
                title,
                slug: taskSlug,
                description,
                isCompleted,
            });
            let { message } = data;

            MySwal.fire({
                icon: 'success',
                title: <h5>{message}</h5>,
                confirmButtonColor: '#212529',
            });
            navigate(`/tasks/${taskSlug}`);
        } catch (err) {
            console.error(err);
        }
    };

    const getTask = async () => {
        try {
            let { data } = await axios.get(`${baseUrl}/tasks/${slug}`);
            setTitle(data.title);
            setTaskSlug(data.slug);
            setDescription(data.description);
            setIsCompleted(data.isCompleted);

            setTimeout(() => {
                setIsLoading(false);
            }, 1000);
        } catch (err) {
            console.error(err);
            setTimeout(() => {
                setIsLoading(false);
            }, 1000);
            navigate('/tasks');
        }
    };

    useEffect(() => {
        getTask();
    }, [slug]);

    if (isLoading) {
        return <Loading />;
    }

    return title ? (
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
                                            <input type="text" name="slug" id="slug" className="form-control" value={taskSlug} onChange={(e) => setTaskSlug(e.target.value)} />
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
                                                <option value={isCompleted}>{isCompleted ? 'Completed' : 'Uncompleted'} - Default</option>
                                                <option value={false}>Uncompleted</option>
                                                <option value={true}>Completed</option>
                                            </select>
                                        </div>

                                        <hr />

                                        <Link to={`/tasks/${slug}`} className="btn btn-outline-dark btn-sm shadow-sm">
                                            Back to task
                                        </Link>
                                        <button type="submit" className="btn btn-dark btn-sm shadow-sm mx-2">
                                            Update Task
                                        </button>
                                    </form>
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

export default EditTask;
