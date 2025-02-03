import React from 'react';
import '../Footer.css'; // Create this file for styles
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons'; // Import the specific icon
import { Link } from 'react-router-dom';


export const Footer = () => {
  return (
    <footer className="footer-area">
      <div className="footer-widget">
        <div className="container">
          <div className="row footer-widget-wrapper pt-100 pb-70">
            <div className="col-md-3 col-lg-3">
              <div className="footer-widget-box about-us">
                <a href="index.html" className="footer-logo">
                  <img
                    src="assets/img/logo/logo12.png"
                    alt="logo"
                    style={{ width: '181px', height: '124px' }}
                  />
                </a>
                <p className="mb-3">
                <b>CivicConnect </b><br /> Enhancing Citizen Engagement in Governance
                </p>
              </div>
            </div>
            <div className="col-md-3 col-lg-3" style={{ paddingLeft: '10%' }}>
              <div className="footer-widget-box list">
                <h4 className="footer-widget-title">Quick Links</h4>
                <ul className="footer-list">
                  <li><Link to="/home" >
                    <i className="fas fa-caret-right"></i>
                    Home
                  </Link></li>

                  <li><Link to="/about" >
                    <i className="fas fa-caret-right"></i>
                    About
                  </Link></li>

                  {/* <li><a href="#"><i className="fas fa-caret-right"></i> Services</a></li> */}
                  {/* <li><a href="#"><i className="fas fa-caret-right"></i> Privacy policy</a></li> */}
                </ul>
              </div>
            </div>
            {/* <div className="col-md-3 col-lg-3">
              <div className="footer-widget-box list">
                <h4 className="footer-widget-title">Services</h4>
                <ul className="footer-list" style={{ justifyContent: 'center' }}>
                  <li style={{ alignItems: 'flex-start' }}><a href="#"><i className="fas fa-caret-right"></i> Electrical Services</a></li>
                  <li style={{ alignItems: 'flex-start' }}><a href="#"><i className="fas fa-caret-right"></i> Water drainage</a></li>
                  <li style={{ alignItems: 'flex-start' }}><a href="#"><i className="fas fa-caret-right"></i> Road and Infrastructure Repairs</a></li>
                </ul>
              </div>
            </div> */}
            <div className="col-md-3 col-lg-3">
              <div className="footer-widget-box list">
                <h4 className="footer-widget-title">Contact Us</h4>
                <ul className="footer-contact" style={{ justifyContent: 'center' }}>
                  <li><a href="tel:+21236547898"><i className="far fa-phone"></i> +91-1234567890</a></li>
                  <li style={{ alignItems: 'flex-start' }}>
                    <i className="far fa-map-marker-alt"></i>
                    <span style={{ display: 'inline-block' }}>Ahmedabad, Gujarat.</span>
                  </li>
                  <li>
                    <a href="/cdn-cgi/l/email-protection#c2abaca4ad82a7baa3afb2aea7eca1adaf">
                      <i className="far fa-envelope"></i>
                      <span className="__cf_email__" data-cfemail="eb82858d84ab8e938a869b878ec5888486"> civicconnect@gmail.com</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="copyright">
        <div className="container">
          <div className="row">
            <div className="col-md-3 align-self-center"></div>
            <br /><br />
            {/* <div className="col-md-3 align-self-center">
              <ul className="footer-social">
                <li><a href="#"><i className="fab fa-facebook-f"></i></a></li>
                <li><a href="#"><i className="fab fa-twitter"></i></a></li>
                <li><a href="#"><i className="fab fa-linkedin-in"></i></a></li>
                <li><a href="#"><i className="fab fa-youtube"></i></a></li>
              </ul>
            </div> */}
          </div>
        </div>
      </div>
      <a href="#" id="scroll-top" ><i className="far fa-arrow-up-from-arc"></i></a>
      {/* <a href="#" id="scroll-top"><FontAwesomeIcon icon="fa-solid fa-arrow-up" /></a> */}
      {/* <a href="#" id="scroll-top"><FontAwesomeIcon icon={faArrowUp} /></a> */}


    </footer>
  );
};
