import React from 'react';

export const Rough = () => {
    return (
        <>
            <main className="main">
                {/* Hero Section */}
                <div className="hero-section">
                    <div className="hero-shape">
                        <div className="hero-shape-1"></div>
                        <div className="hero-shape-2"></div>
                        <div className="hero-shape-3"></div>
                        <div className="hero-shape-4"></div>
                        <div className="hero-shape-5"></div>
                        <div className="hero-shape-6"></div>
                    </div>
                    <div className="hero-slider owl-carousel owl-theme">
                        <div
                            className="hero-single"
                            style={{
                                backgroundImage: 'url(/assets/img/logo/4.jpg)',
                                height: '400px',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'
                            }}
                        >
                            <div className="container">
                                <div className="row align-items-center">
                                    <div className="col-md-12 col-lg-7">
                                        <div className="hero-content">
                                            <h1 className="hero-title" data-animation="fadeInRight" data-delay=".50s">
                                                Civic-Connect
                                            </h1>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div
                            className="hero-single"
                            style={{
                                backgroundImage: 'url(/assets/img/logo/3.jpg)',
                                height: '400px',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'
                            }}
                        >
                            <div className="container">
                                <div className="row align-items-center">
                                    <div className="col-md-12 col-lg-7">
                                        <div className="hero-content">
                                            <h1 className="hero-title" data-animation="fadeInRight" data-delay=".50s">
                                                Civic-Connect
                                            </h1>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div
                            className="hero-single"
                            style={{
                                backgroundImage: 'url(/assets/img/logo/road_1.jpg)',
                                height: '400px',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'
                            }}
                        >
                            <div className="container">
                                <div className="row align-items-center">
                                    <div className="col-md-12 col-lg-7">
                                        <div className="hero-content">
                                            <h1 className="hero-title" data-animation="fadeInRight" data-delay=".50s">
                                                Civic-Connect
                                            </h1>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* About Area */}
                <div className="about-area py-120">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-lg-6">
                                <div className="about-left">
                                    <div className="about-img">
                                        <img src="/assets/img/logo/4.jpg" alt="About CivicConnect" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="about-right">
                                    <div className="site-heading mb-3">
                                        <h2 className="site-title">CivicConnect</h2>
                                    </div>
                                    <p className="about-text">
                                        CivicConnect is a web-based application designed to bridge the gap between citizens and the municipal government of Ahmedabad. The platform allows users to report civic issues, such as infrastructural problems or concerns related to public amenities, by uploading images and providing descriptions. With tailored access for administrators, users, and citizens, the platform streamlines user authentication and issue tracking, fostering transparency and accountability.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Services Area */}
                <div className="service-area bg py-120">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6 mx-auto">
                                <div className="site-heading text-center">
                                    <h2 className="site-title">Our Best <span>Services</span></h2>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 col-lg-4">
                                <div className="service-item">
                                    <div className="service-img">
                                        <img src="/assets/img/service/01.jpg" alt="Electrical Services" />
                                    </div>
                                    <div className="service-content">
                                        <h3 className="service-title">
                                            <a href="service-single.html">Electrical Services</a>
                                        </h3>
                                        <p className="service-text">
                                            Electrical services involve the installation, maintenance, and repair of electrical systems in residential, commercial settings.
                                        </p>
                                        <div className="service-arrow">
                                            <a href="service-single.html">Read More<i className="fas fa-arrow-right-long"></i></a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-6 col-lg-4">
                                <div className="service-item">
                                    <div className="service-img">
                                        <img src="/assets/img/logo/water1.jpg" alt="Water Drainage" />
                                    </div>
                                    <div className="service-content">
                                        <h3 className="service-title">
                                            <a href="service-single.html">Water Drainage</a>
                                        </h3>
                                        <p className="service-text">
                                            Water drainage systems manage excess water to prevent flooding and maintain soil stability in various environments.
                                        </p>
                                        <div className="service-arrow">
                                            <a href="service-single.html">Read More<i className="fas fa-arrow-right-long"></i></a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-6 col-lg-4">
                                <div className="service-item">
                                    <div className="service-img">
                                        <img src="/assets/img/logo/road4.jpg" alt="Road and Infrastructure Repairs" />
                                    </div>
                                    <div className="service-content">
                                        <h3 className="service-title">
                                            <a href="service-single.html">Road and Infrastructure Repairs</a>
                                        </h3>
                                        <p className="service-text">
                                            Road and infrastructure repairs maintain public transportation systems, ensuring safety and accessibility.
                                        </p>
                                        <div className="service-arrow">
                                            <a href="service-single.html">Read More<i className="fas fa-arrow-right-long"></i></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};
