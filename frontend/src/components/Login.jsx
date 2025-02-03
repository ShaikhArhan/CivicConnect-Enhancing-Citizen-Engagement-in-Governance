import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Login.css";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const Login = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false); // New loading state
  const countryCode = "+91";
  let falseCount = 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true to disable the button

    const data = {
      phoneNumber: phone
    };

    const configOtp = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true
    };

    // const configUser = {
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   withCredentials: true
    // }

    // console.log("Login ", phone);
    // const dataUser = {
    //   phoneNo: phone
    // }
    try {
      const accountPresent = await axios.get(`http://localhost:3001/user/getUserById/UserPhoneNo/${phone}`);
      console.log("accountPresent",accountPresent);
      
      // const accountPresent = await axios.post("http://localhost:3001/auth/login", dataUser, configUser);

      // console.log("accountPresent- ", accountPresent);

      if (accountPresent.data.success === true) {
        try {
          const otpResponse = await axios.post(
            "http://localhost:3001/otp/sendOtp",
            data,
            configOtp
          );

          console.log("otpResponse " + otpResponse.data.success);

          if (otpResponse.data.success === true) {
            toast('🔐 Sending OTP', {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });

            setTimeout(() => {
              localStorage.setItem('phone', phone);
              navigate(`/otp/${"login"}`);
            }, 3000);
          } else {
            console.log("Login- failed to send otp", otpResponse.status);
            toast('❌ Failed to send OTP', {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          }
        } catch (error) {
          console.error("Error sending OTP: ", error);
          if (!error.response) {
            toast('🌐 Internet connection required', {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          } else {
            toast('❌ Error sending OTP', {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          }
        }
      } else {
        toast('⚠️ Account not registered', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        falseCount = falseCount + 1;
        if (falseCount > 2) {
          setTimeout(() => {
            setPhone('');
            navigate("/registration");
          }, 3100);
        }
      }
    } catch (error) {
      console.error("Error checking account: ", error);
      if (!error.response) {
        toast('🌐 Internet connection required', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        toast('❌ Error checking account', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }

    setLoading(false); // Re-enable the button after the submission completes
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="container-fluid make-f border pb-5" id="loginContainer">
        <div className="card bg-light shadow login-card">
          <article className="card-body mx-auto" style={{ maxWidth: '400px' }}>
            <h4 className="card-title my-3 text-center bold text-dark"> Login </h4>
            <form onSubmit={handleSubmit}>
              <div className="form-group input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text myicon"> <i className="fa fa-phone"></i> </span>
                </div>
                <span className="country-code">+91</span>
                <input
                  className="form-control"
                  maxLength="10"
                  placeholder="Phone Number"
                  type="text"
                  onChange={(e) => setPhone(countryCode + e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <button type="submit" className="btn btn-primary btn-block bold" disabled={loading}> {/* Disable the button when loading */}
                  {loading ? 'Logging in...' : 'Login'} {/* Show 'Logging in...' when loading */}
                </button>
              </div>
            </form>
            <span>No account created, <Link to={"/registration"}>register here</Link></span>
          </article>
        </div>
      </div>
    </>
  );
};
