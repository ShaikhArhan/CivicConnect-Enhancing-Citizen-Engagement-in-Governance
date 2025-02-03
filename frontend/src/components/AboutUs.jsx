import React from 'react'
import { Footer } from './Footer'

export const AboutUs = () => {
  return (
    <>
      <br /><br />
      {/* <div>AboutUs</div> */}
      <main class="main">
        <div class="hero-section">
          <div class="hero-shape">
            <div class="hero-shape-1"></div>
            <div class="hero-shape-2"></div>
            <div class="hero-shape-3"></div>
            <div class="hero-shape-4"></div>
            <div class="hero-shape-5"></div>
            <div class="hero-shape-6"></div>
          </div>          
          <div class="appointment">
            <div class="col-lg-8">
            </div>
          </div>
          <div class="about-area py-120">
            <div class="container">
              <div class="row align-items-center">
                <div class="col-lg-6">
                  <div class="about-left wow fadeInLeft" data-wow-delay=".25s">
                    <div class="about-img">
                      <img src="assets/img/logo/11.jpg" alt="" />
                    </div>

                  </div>
                </div>
                <div class="col-lg-6">
                  <div class="about-right wow fadeInRight" data-wow-delay=".25s">
                    <div class="site-heading mb-3">
                      <h2 class="site-title">
                        ABOUT AS
                      </h2>
                    </div>
                    <p class="about-text">
                      We are proud to offer a comprehensive range of essential public services designed to improve the everyday lives of our residents. Our skilled team of professionals ensures that all electrical issues, including streetlight repairs, public lighting maintenance, and electrical installations in municipal buildings, are addressed with efficiency and safety in mind. We are also committed to resolving water drainage problems, from clogged drains to flood prevention, by maintaining and upgrading the city’s drainage infrastructure to protect public areas from water damage and improve stormwater flow. Additionally, we take care of road and infrastructure repairs, ensuring that potholes, broken roads, and other public infrastructure issues are promptly fixed. Our ultimate goal is to maintain safe, smooth, and accessible roads and public spaces for secure and efficient transportation within our community.
                    </p>
                    {/* <a href="about.html" class="theme-btn mt-4">Discover More<i class="fas fa-arrow-right-long"></i></a> */}
                  </div>
                </div>
              </div>
            </div>
          </div>


          
        </div>
      </main >
      <Footer />
    </>
  )
}
