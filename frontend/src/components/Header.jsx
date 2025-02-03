import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import "../Header.css";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhoneVolume } from '@fortawesome/free-solid-svg-icons';


export default function Header() {
  const [login, setLogin] = useState(false);
  const [register, setRegister] = useState(false);

  // const navigate = useNavigate()

  useEffect(() => {
    verification();
  }, []);

  const verification = async () => {
    try {
      const token = localStorage.getItem('authorization');
      if (token) {
        setLogin(true);
        const tokenDecoded = jwtDecode(token);
        // console.log("tokenDecoded",tokenDecoded)
        const accountPresent = await axios.get(`http://localhost:3001/user/getUserById/UserPhoneNo/${tokenDecoded.UserPhoneNo}`);
        // console.log("accountPresent.data.data",accountPresent.data.data)
        if (tokenDecoded.UserPhoneNo == accountPresent.data.data.UserPhoneNo) {
          setRegister(true);
        }
      }
    } catch (err) {
      console.error(err)
    }
  };

  return (
    <>
      <header className="header">
        <div className="header-top">
          <div className="container">
            <div className="header-top-wrapper">
              <div className="header-top-left">
                <div className="header-top-contact">
                  <ul>
                    <li>
                      <a href="mailto:as8340453@gmail.com">
                        <i className="far fa-envelope"></i>
                        <span className="__cf_email__" data-cfemail="b7ded9d1d8f7d2cfd6dac7dbd299d4d8da">civicconnect@gmail.com</span>
                      </a>
                    </li>
                    <li>
                      <a href="tel:+1234567890">
                        <FontAwesomeIcon icon={faPhoneVolume} /> +91-1234567890
                      </a>

                    </li>
                  </ul>
                </div>
              </div>
              {/* <div className="header-top-right">
                <div className="header-top-social">
                  <span>Follow Us: </span>
                  <a href="#"><i className="fab fa-facebook"></i></a>
                  <a href="#"><i className="fab fa-twitter"></i></a>
                  <a href="#"><i className="fab fa-instagram"></i></a>
                  <a href="#"><i className="fab fa-linkedin"></i></a>
                </div>
              </div> */}
            </div>
          </div>
        </div>

        <div className="main-navigation">
          <nav className="navbar navbar-expand-lg" style={{ height: "100px" }}>
            <div className="container position-relative">
              <div className="navbar-brand" href="index.html">
                <img src="/assets/img/logo/logo12.png" alt="logo" style={{ width: "128px" }} />
                CivicConnect
              </div>

              <div className="mobile-menu-right">
                <div className="search-btn">
                  {/* <button type="button" className="nav-right-link">
                    <i className="far fa-search"></i>
                  </button> */}
                </div>
                <button
                  className="navbar-toggler"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#main_nav"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-mobile-icon">
                    <i className="far fa-bars"></i>
                  </span>
                </button>
              </div>

              <div className="collapse navbar-collapse" id="main_nav">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link to="/home" className="nav-link">Home</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/about" className="nav-link">About</Link>
                  </li>
                  {!login || !register ? (
                    <div className="nav-right">
                      <div className="nav-right-btn mt-2">
                        <Link to="/login" className="theme-btn" >Login<i className="fas fa-arrow-right-long"></i></Link>
                      </div>
                    </div>) : null
                  }
                  {login && register ?
                    (<>
                      <li className="nav-item dropdown">
                        <Link to="/display-issue" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">Issue</Link>
                        <ul className="dropdown-menu fade-down">
                          <Link to={`/display-issue/${"Accepted"}`} className="dropdown-item">Unsolved</Link>
                          <Link to={`/display-issue/${"Solved"}`} className="dropdown-item">Solved</Link>
                        </ul>
                      </li>
                      <li className="nav-item">
                        <Link to="/upload-issue" className="nav-link" style={{ whiteSpace: "nowrap" }}>Uploading Issue</Link>
                      </li>
                      <li className="nav-item">
                        <Link to="/UserProfile" className="nav-link" >Profile</Link>
                      </li>
                    </>) : null
                  }
                </ul>

              </div>

              {/* <div className="search-area">
                <form action="#">
                  <div className="form-group">
                    <input type="text" className="form-control" placeholder="Type Keyword..." />
                    <button type="submit" className="search-icon-btn">
                      <i className="far fa-search"></i>
                    </button>
                  </div>
                </form>
              </div> */}
            </div>
          </nav>
        </div>
      </header>


      {/* <nav className="navbar navbar-expand-sm fixed-top">
        <div className="container-fluid">
          <button
            type="button"
            className="navbar-toggler btn btn-primary justify-content-end"
            data-bs-toggle="collapse"
            data-bs-target="#collapsednavbar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-start px-2"
            id="collapsednavbar"
          >
            <ul className="navbar-nav fontlight">
              <li className="nav-item">
                <Link to="/home" className="nav-link text-uppercase px-4">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/about" className="nav-link text-uppercase px-4">
                  About
                </Link>
              </li>
            </ul>
          </div>
          <div
            className="collapse navbar-collapse justify-content-end px-2"
            id="collapsednavbar"
          >
            <ul className="navbar-nav fontlight">
              {!login || !register ? (
                <li id="loginButton" className="nav-item">
                  <Link to="/login" className="nav-link text-uppercase px-4">
                    Login/Registration
                  </Link>
                </li>
              ) : null}
              {login && register ? (
                <>
                  <li className="nav-item">
                    <Link to="/display-issue" className="nav-link text-uppercase px-4">
                      Displaying Issue
                    </Link>
                  </li>
                  <li id="uploadButton" className="nav-item">
                    <Link to="/upload-issue" className="nav-link text-uppercase px-4">
                      Uploading Issue
                    </Link>
                  </li>
                  <li id="profileButton" className="nav-item">
                    <Link to="/UserProfile" className="nav-link text-uppercase px-4">
                      Profile
                    </Link>
                  </li>
                </>
              ) : null}
            </ul>
          </div >
        </div>
      </nav> */}
    </>


  );
}


// <nav className="navbar navbar-expand-sm fixed-top">
//   <div className="container-fluid">
//     <button
//       type="button"
//       className="navbar-toggler btn btn-primary justify-content-end"
//       data-bs-toggle="collapse"
//       data-bs-target="#collapsednavbar"
//     >
//       <span className="navbar-toggler-icon"></span>
//     </button>
//     <div
//       className="collapse navbar-collapse justify-content-start px-2"
//       id="collapsednavbar"
//     >
//       <ul className="navbar-nav fontlight">
//         <li className="nav-item">
//           <Link to="/home" className="nav-link text-uppercase px-4">
//             Home
//           </Link>
//         </li>
//         <li className="nav-item">
//           <Link to="/about" className="nav-link text-uppercase px-4">
//             About
//           </Link>
//         </li>
//       </ul>
//     </div>
//     <div
//       className="collapse navbar-collapse justify-content-end px-2"
//       id="collapsednavbar"
//     >
//       <ul className="navbar-nav fontlight">
//         {!login || !register ? (
//           <li id="loginButton" className="nav-item">
//             <Link to="/login" className="nav-link text-uppercase px-4">
//               Login/Registration
//             </Link>
//           </li>
//         ) : null}
//         {login && register ? (
//           <>
//             <li className="nav-item">
//               <Link to="/display-issue" className="nav-link text-uppercase px-4">
//                 Displaying Issue
//               </Link>
//             </li>
//             <li id="uploadButton" className="nav-item">
//               <Link to="/upload-issue" className="nav-link text-uppercase px-4">
//                 Uploading Issue
//               </Link>
//             </li>
//             <li id="profileButton" className="nav-item">
//               <Link to="/UserProfile" className="nav-link text-uppercase px-4">
//                 Profile
//               </Link>
//             </li>
//           </>
//         ) : null}
//       </ul>
//     </div>
//   </div>
// </nav>




// <header className="header">
//         <div className="header-top">
//           <div className="container">
//             <div className="header-top-wrapper">
//               <div className="header-top-left">
//                 <div className="header-top-contact">
//                   <ul>
//                     <li>
//                       <a href="/cdn-cgi/l/email-protection#1f767179705f7a677e726f737a317c7072">
//                         <i className="far fa-envelope"></i>
//                         <span className="__cf_email__" data-cfemail="b7ded9d1d8f7d2cfd6dac7dbd299d4d8da">civicconnect@gmail.com</span>
//                       </a>
//                     </li>
//                     <li>
//                       {/* <a href="tel:+1234567890">
//                       <i className="far fa-phone-volume"></i> +91-1234567890
//                     </a> */}
//                       <a href="tel:+1234567890">
//                         <FontAwesomeIcon icon={faPhoneVolume} /> +91-1234567890
//                       </a>

//                     </li>
//                   </ul>
//                 </div>
//               </div>
//               <div className="header-top-right">
//                 <div className="header-top-social">
//                   <span>Follow Us: </span>
//                   <a href="#"><i className="fab fa-facebook"></i></a>
//                   <a href="#"><i className="fab fa-twitter"></i></a>
//                   <a href="#"><i className="fab fa-instagram"></i></a>
//                   <a href="#"><i className="fab fa-linkedin"></i></a>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="main-navigation">
//           <nav className="navbar navbar-expand-lg">
//             <div className="container position-relative">
//               <a className="navbar-brand" href="index.html">
//                 <img src="/assets/img/logo/logo12.png" alt="logo" style={{ width: "128px", height: "92px" }} />
//               </a>
//               <div className="mobile-menu-right">
//                 <div className="search-btn">
//                   <button type="button" className="nav-right-link">
//                     <i className="far fa-search"></i>
//                   </button>
//                 </div>
//                 <button
//                   className="navbar-toggler"
//                   type="button"
//                   data-bs-toggle="collapse"
//                   data-bs-target="#main_nav"
//                   aria-expanded="false"
//                   aria-label="Toggle navigation"
//                 >
//                   <span className="navbar-toggler-mobile-icon">
//                     <i className="far fa-bars"></i>
//                   </span>
//                 </button>
//               </div>
//               <div className="collapse navbar-collapse" id="main_nav">
//                 <ul className="navbar-nav">
//                   <li className="nav-item">
//                     <a className="nav-link active" href="index.html">Home</a>
//                   </li>
//                   <li className="nav-item"><a className="nav-link" href="about.html">About</a></li>
//                   <li className="nav-item dropdown">
//                     <a className="nav-link dropdown-toggle" href="products.html" data-bs-toggle="dropdown">Services</a>
//                     <ul className="dropdown-menu fade-down">
//                       <li><a href="#" className="dropdown-item">Electrical Services</a></li>
//                       <li><a href="#" className="dropdown-item">Water drainage</a></li>
//                       <li><a href="#" className="dropdown-item">Road and Infrastructure Repairs</a></li>
//                     </ul>
//                   </li>
//                   <li className="nav-item"><a className="nav-link" href="contact.html">Contact</a></li>
//                 </ul>
//                 <div className="nav-right">
//                   <div className="search-btn">
//                     <button type="button" className="nav-right-link"></button>
//                   </div>
//                   <div className="nav-right-btn mt-2">
//                     <a href="login.html" className="theme-btn">Login<i className="fas fa-arrow-right-long"></i></a>
//                   </div>
//                 </div>
//               </div>

//               <div className="search-area">
//                 <form action="#">
//                   <div className="form-group">
//                     <input type="text" className="form-control" placeholder="Type Keyword..." />
//                     <button type="submit" className="search-icon-btn">
//                       <i className="far fa-search"></i>
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </nav>
//         </div>
//       </header>







//<header class="header">
//        <div class="header-top">
//          <div class="container">
//            <div class="header-top-wrapper">
//              <div class="header-top-left">
//                <div class="header-top-contact">
//                  <ul>
//
//                    <li>
//                      <a href="/cdn-cgi/l/email-protection#1f767179705f7a677e726f737a317c7072">
//                        <i class="far fa-envelopes"></i>
//                        <span class="_cf_email_" data-cfemail="b7ded9d1d8f7d2cfd6dac7dbd299d4d8da">civicconnect@gmail.com</span>
//                      </a>
//                    </li>
//                    <li>
//                      <a href="tel:+1234567890"><i class="far fa-phone-volume"></i> +91-1234567890</a>
//                    </li>
//                  </ul>
//                </div>
//              </div>
//              <div class="header-top-right">
//                <div class="header-top-social">
//                  <span>Follow Us: </span>
//                  <a href="#"><i class="fab fa-facebook"></i></a>
//                  <a href="#"><i class="fab fa-twitter"></i></a>
//                  <a href="#"><i class="fab fa-instagram"></i></a>
//                  <a href="#"><i class="fab fa-linkedin"></i></a>
//                </div>
//              </div>
//            </div>
//          </div>
//        </div>
//        <div class="main-navigation">
//          <nav class="navbar navbar-expand-lg">
//            <div class="container position-relative">
//              <a class="navbar-brand" href="index.html">
//                <img src="assets/img/logo/web_logo.png" alt="logo" style={{ width: "128px", height: "92px" }} />
//              </a>
//              <div class="mobile-menu-right">
//                <div class="search-btn">
//                  <button type="button" class="nav-right-link"><i class="far fa-search"></i></button>
//                </div>
//                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#main_nav" aria-expanded="false" aria-label="Toggle navigation">
//                  <span class="navbar-toggler-mobile-icon"><i class="far fa-bars"></i></span>
//                </button>
//              </div>
//              <div class="collapse navbar-collapse" id="main_nav">
//                <ul class="navbar-nav">
//                  <li class="nav-item">
//                    <Link to="/home" className="nav-link text-uppercase px-4">
//                      Home
//                    </Link>
//                  </li>
//                  <li class="nav-item"><Link to="/about" className="nav-link text-uppercase px-4">
//                    About
//                  </Link></li>
//
//
//                  <li class="nav-item"><Link to="/display-issue" className="nav-link text-uppercase px-4">
//                    Displaying Issue
//                  </Link></li>
//                  <li class="nav-item"><Link to="/upload-issue" className="nav-link text-uppercase px-4">
//                    Uploading Issue
//                  </Link></li>
//                  <li class="nav-item"><Link to="/UserProfile" className="nav-link text-uppercase px-4">
//                    Profile
//                  </Link></li>
//                </ul>
//                <div class="nav-right">
//                  <div class="search-btn">
//                    <button type="button" class="nav-right-link"></button>
//                  </div>
//                  <div class="nav-right-btn mt-2">
//                  {/* {!login || !register ? ( */}
//                    {/* <a href="login.html" class="theme-btn">Regrestration<i class="fas fa-arrow-right-long"></i></a> */}
//                    <Link to="/login" className="theme-btn ">
//                    Login/Registration<i class="fas fa-arrow-right-long"></i>
//                  </Link>
//                  {/*  ):null} */}
//                  </div>
//                </div>
//              </div>
//
//              <div class="search-area">
//                <form action="#">
//                  <div class="form-group">
//                    <input type="text" class="form-control" placeholder="Type Keyword..." />
//                    <button type="submit" class="search-icon-btn"><i class="far fa-search"></i></button>
//                  </div>
//                </form>
//              </div>
//
//            </div>
//          </nav>
//        </div>
//      </header>
//