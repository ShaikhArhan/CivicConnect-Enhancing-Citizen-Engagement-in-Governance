import React, { useEffect, useState } from 'react'
import "../Home.css"
// import 'bootstrap/dist/css/bootstrap.min.css';

import { Footer } from './Footer'
import { Link } from 'react-router-dom';
export const Home = () => {
  const images = ["4.jpg", "3.jpg", "road_1.jpg"];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval); // Clear interval on unmount
  }, [images.length]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <>
      {/* <br /><br /> */}
      {/* <div style={{ display: "flex", }}>HOME</div> */}
      <main className="main">
        <div className="hero-section">
          <div className="hero-shape">
            <div className="hero-shape-1"></div>
            <div className="hero-shape-2"></div>
            <div className="hero-shape-3"></div>
            <div className="hero-shape-4"></div>
            <div className="hero-shape-5"></div>
            <div className="hero-shape-6"></div>
          </div>
          <div className="hero-slider">
            {images.map((image, index) => (
              <div
                key={index}
                className={`hero-single ${index === currentIndex ? "active" : ""}`}
                style={{
                  backgroundImage: `url(assets/img/logo/${image})`,
                  display: index === currentIndex ? "block" : "none", // Only display the active slide
                  height: "50vh"
                }}
              >
                <div className="container">
                  <div className="row align-items-center">
                    <div className="col-md-12 col-lg-7">
                      <div className="hero-content">
                        <h1 className="hero-title">Civic-Connect </h1>
                        <h3>Connecting Citizens Digitally for Improved Governance</h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* <div class="carousel-container">
              <div class="carousel-slide">                
                  <button class="carousel-button left">&#10094;</button>
                  <button class="carousel-button right">&#10095;</button>
              </div>
            </div> */}

            {/* Navigation Buttons */}
            <div class="carousel-slide">
              <button className="slider-button left carousel-button" onClick={prevSlide}>
                &#10094; {/* Left Arrow */}
              </button>
              <button className="slider-button right carousel-button" onClick={nextSlide}>
                &#10095; {/* Right Arrow */}
              </button>
            </div>
          </div>
        </div>

        <div className="about-area">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6">
                <div className="about-left">
                  <img src="assets/img/logo/11.jpg" alt="About Us" className="about-img" />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="about-right">
                  <h2 className="site-title">CivicConnect</h2>
                  <p className="about-text">
                    The "CivicConnect: Connecting Citizens Digitally for Improved Governance" project aims to revolutionize the way citizens interact with local governance, specifically within the city of Ahmedabad. The project provides a digital platform where residents can raise issues and concerns, making the process of communication with government bodies seamless and efficient. Built with a robust backend architecture involving various controllers for managing admins, users, problems, and roles, the system ensures smooth authentication, secure data management, and comprehensive issue tracking. React is employed as the frontend framework to offer an intuitive and responsive user experience. Additionally, the system will soon integrate a chatbot through LangChain technology, leveraging the Milvus vector database for improved citizen-government interaction.

                  </p>
                  {/* <a href="about.html" className="theme-btn">Discover More<i className="fas fa-arrow-right-long"></i></a> */}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="service-area">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 mx-auto text-center">
                <span className="site-title-tagline">Our Services</span>
                <h2 className="site-title">We Best <span>Services</span></h2>
              </div>
            </div>
            <div className="row">
              {[
                { title: "Electrical Services", img: "service/01.jpg", desc: "Electrical services involve the installation, maintenance, and repair of electrical systems in residential, commercial." },
                { title: "Water Drainage", img: "logo/water1.jpg", desc: "Water drainage systems manage the removal of excess water to prevent flooding and maintain soil stability in various environments." },
                { title: "Road and Infrastructure Repairs", img: "logo/road4.jpg", desc: "Road and infrastructure repairs maintain and restore public transportation systems to ensure safety and accessibility." },
              ].map((service, index) => (
                <div key={index} className="col-md-6 col-lg-4">
                  <div className="service-item">
                    <img src={`assets/img/${service.img}`} alt={service.title} className="service-img" />
                    <div className="service-content">
                      <h3 className="service-title">
                        <a>{service.title}</a>
                      </h3>
                      <p className="service-text">{service.desc}</p>
                      <Link to="/upload-issue" className="service-arrow">Uploading Issue<i className="fas fa-arrow-right-long"></i></Link>

                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div> */}
      </main>
      <Footer />
    </>
  )
}

//{/* <main class="main"> */ }
//{/* <div class="hero-section"> */ }
//{/* <div class="hero-shape"> */ }
//{/* <div class="hero-shape-1"></div> */ }
//{/* <div class="hero-shape-2"></div> */ }
//{/* <div class="hero-shape-3"></div> */ }
//{/* <div class="hero-shape-4"></div> */ }
//{/* <div class="hero-shape-5"></div> */ }
//{/* <div class="hero-shape-6"></div> */ }
//{/* </div> */ }
//{/* <div class="hero-slider owl-carousel owl-theme"> */ }
//{/* {/* <div class="hero-single" style={{ backgroundImage: 'url(/assets/img/logo/4.jpg)' }}> */ }
//<div class="container">
//  <div class="row align-items-center">
//    <div class="col-md-12 col-lg-7">
//      <div class="hero-content">
//        <h6 class="hero-sub-title" data-animation="fadeInDown" data-delay=".25s">
//
//        </h6>
//        <h1 class="hero-title" data-animation="fadeInRight" data-delay=".50s">
//          Civic-Connect
//        </h1>
//      </div>
//    </div>
//  </div>
//</div>
//            </div > */}
//{/* <div */ }
//className = "hero-single"
//style = {{
//  backgroundImage: 'url(/assets/img/logo/4.jpg)',
//    height: '400px',
//      backgroundSize: 'cover',
//        backgroundPosition: 'center'
//}}
//            >
//  {/* <div className="container"> */ }
//{/* <div className="row align-items-center"> */ }
//{/* <div className="col-md-12 col-lg-7"> */ }
//{/* <div className="hero-content"> */ }
//{/* <h1 className="hero-title" data-animation="fadeInRight" data-delay=".50s"> */ }
//{/* Civic-Connect */ }
//{/* </h1> */ }
//{/* </div> */ }
//{/* </div> */ }
//{/* </div> */ }
//{/* </div> */ }
//{/* </div> */ }
//<div class="hero-single" style={{ backgroundImage: 'url(/assets/img/logo/3.jpg)' }}>
//  <div className="hero-single" style={{ backgroundImage: 'url(/assets/img/logo/4.jpg)', height: '400px', backgroundSize: 'cover', backgroundPosition: 'center' }}>
//    <div class="container">
//      <div class="row align-items-center">
//        <div class="col-md-12 col-lg-7">
//          <div class="hero-content">
//            <h6 class="hero-sub-title" data-animation="fadeInDown" data-delay=".25s"></h6>
//            <h1 class="hero-title" data-animation="fadeInRight" data-delay=".50s">Civic-Connect</h1>
//          </div>
//        </div>
//      </div>
//    </div>
//  </div>
//  <div class="hero-single" style={{ backgroundImage: 'url(/assets/img/logo/road_1.jpg)' }}>
//    <div class="container">
//      <div class="row align-items-center">
//        <div class="col-md-12 col-lg-7">
//          <div class="hero-content">
//            <h6 class="hero-sub-title" data-animation="fadeInDown" data-delay=".25s"></h6>
//            <h1 class="hero-title" data-animation="fadeInRight" data-delay=".50s">Civic-Connect</h1>
//          </div>
//        </div>
//      </div>
//    </div>
//  </div>
//</div>
//        </div >
//        <div class="appointment">
//          <div class="col-lg-8">
//          </div>
//        </div>
//        <div class="about-area py-120">
//          <div class="container">
//            <div class="row align-items-center">
//              <div class="col-lg-6">
//                <div class="about-left wow fadeInLeft" data-wow-delay=".25s">
//                  <div class="about-img">
//                    <img src="assets/img/logo/11.jpg" alt="" />
//                  </div>
//
//                </div>
//              </div>
//              <div class="col-lg-6">
//                <div class="about-right wow fadeInRight" data-wow-delay=".25s">
//                  <div class="site-heading mb-3">
//                    <h2 class="site-title">
//                      ABOUT AS
//                    </h2>
//                  </div>
//                  <p class="about-text">
//                    We are proud to offer a comprehensive range of essential public services designed to improve the everyday lives of our residents. Our skilled team of professionals ensures that all electrical issues, including streetlight repairs, public lighting maintenance, and electrical installations in municipal buildings, are addressed with efficiency and safety in mind. We are also committed to resolving water drainage problems, from clogged drains to flood prevention, by maintaining and upgrading the city’s drainage infrastructure to protect public areas from water damage and improve stormwater flow. Additionally, we take care of road and infrastructure repairs, ensuring that potholes, broken roads, and other public infrastructure issues are promptly fixed. Our ultimate goal is to maintain safe, smooth, and accessible roads and public spaces for secure and efficient transportation within our community.
//                  </p>
//                  <a href="about.html" class="theme-btn mt-4">Discover More<i class="fas fa-arrow-right-long"></i></a>
//                </div>
//              </div>
//            </div>
//          </div>
//        </div>
//
//
//        <div class="service-area bg py-120">
//          <div class="container">
//            <div class="row">
//              <div class="col-lg-6 mx-auto">
//                <div class="site-heading text-center">
//                  <span class="site-title-tagline"><i class="far fa-lightbulb-on"></i> Our Services</span>
//                  <h2 class="site-title">We Best <span>Services</span></h2>
//                </div>
//              </div>
//            </div>
//            <div class="row">
//              <div class="col-md-6 col-lg-4">
//                <div class="service-item wow fadeInUp" data-wow-delay=".25s">
//                  <div class="service-img">
//                    <img src="assets/img/service/01.jpg" alt="" />
//
//                  </div>
//                  <div class="service-content">
//                    <h3 class="service-title">
//                      <a href="service-single.html">Electrical Services</a>
//                    </h3>
//                    <p class="service-text">
//                      Electrical services involve the installation, maintenance, and repair of electrical systems in residential, commercial.
//                    </p>
//                    <div class="service-arrow">
//                      <a href="service-single.html">Read More<i class="fas fa-arrow-right-long"></i></a>
//                    </div>
//                  </div>
//                </div>
//              </div>
//              <div class="col-md-6 col-lg-4">
//                <div class="service-item wow fadeInDown" data-wow-delay=".25s">
//                  <div class="service-img">
//                    <img src="assets/img/logo/water1.jpg" alt="" />
//
//                  </div>
//                  <div class="service-content">
//                    <h3 class="service-title">
//                      <a href="service-single.html">Water drainage</a>
//                    </h3>
//                    <p class="service-text">
//                      Water drainage systems manage the removal of excess water to prevent flooding and maintain soil stability in various environments.
//                    </p>
//                    <div class="service-arrow">
//                      <a href="service-single.html">Read More<i class="fas fa-arrow-right-long"></i></a>
//                    </div>
//                  </div>
//                </div>
//              </div>
//              <div class="col-md-6 col-lg-4">
//                <div class="service-item wow fadeInUp" data-wow-delay=".25s">
//                  <div class="service-img">
//                    <img src="assets/img/logo/road4.jpg" alt="" />
//
//                  </div>
//                  <div class="service-content">
//                    <h3 class="service-title">
//                      <a href="service-single.html">Road and Infrastructure Repairs</a>
//                    </h3>
//                    <p class="service-text">
//                      Road and infrastructure repairs maintain and restore public transportation systems to ensure safety and accessibility.
//                    </p>
//                    <div class="service-arrow">
//                      <a href="service-single.html">Read More<i class="fas fa-arrow-right-long"></i></a>
//                    </div>
//                  </div>
//                </div>
//              </div>
//            </div>
//          </div>
//        </div>
//      </main >