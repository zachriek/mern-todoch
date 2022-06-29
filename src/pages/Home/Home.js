import React, { useEffect, useState } from 'react';
import { BaseLayout } from '../../layouts';
import { HeroBackground } from '../../assets/images';
import './Home.css';
import { Loading } from '../../components';

const Home = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    }, []);

    if (isLoading) {
        return <Loading />;
    }

    return (
        <BaseLayout title="Home">
            <section
                className="home"
                style={{
                    background: `url(${HeroBackground})`,
                }}
            >
                <div className="overlay"></div>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12 col-lg-6 text-center text-light">
                            <h1>TODOCH</h1>
                            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Atque eius, velit dignissimos error sunt hic delectus eveniet molestias placeat recusandae.</p>
                        </div>
                    </div>
                </div>
            </section>
        </BaseLayout>
    );
};

export default Home;
