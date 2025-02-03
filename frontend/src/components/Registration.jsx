import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Login.css";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const Registration = () => {
  var navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const countryCode = "+91";

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
    console.log("Registration " + username, phone);
    const accountPresent = await axios.get(`http://localhost:3001/user/getUserById/UserPhoneNo/${phone}`);
    try {
      if (accountPresent.data.success === false) {
        try {
          var otpResponse = await axios.post(
            "http://localhost:3001/otp/sendOtp",
            data,
            configOtp
          );

          console.log("otpResponse " + otpResponse.data.success);
        } catch {
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
        }
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
            localStorage.setItem('username', username);
            localStorage.setItem('phone', phone);
            setPhone('');
            setUsername('');
            navigate(`/otp/${"register"}`);
          }, 3000);
        } else {
          console.log("Signup failed to send otp", otpResponse.status);
        }
      } else {
        toast('⚠️Account already exists', {
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
      console.log(error);
    } finally {
      setLoading(false); // Re-enable the button after the submission completes
    }
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
            <h4 className="card-title my-3 text-center bold text-dark"> Registration </h4>
            <form onSubmit={handleSubmit}>
              <div className="form-group input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text myicon"> <i className="fa fa-user"></i> </span>
                </div>
                <input
                  name=""
                  className="form-control"
                  placeholder="Full Name"
                  type="text"
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="form-group input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text myicon"> <i className="fa fa-phone"></i> </span>
                </div>
                <input
                  name=""
                  className="form-control"
                  placeholder="Phone Number"
                  type="text"
                  onChange={(e) => setPhone(countryCode + e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <button type="submit" className="btn btn-primary btn-block bold" disabled={loading}> {/* Disable the button when loading */}
                  {loading ? 'Submitting...' : 'Register'} {/* Show 'Submitting...' when loading */}
                </button>
              </div>
            </form>
          </article>
        </div>
      </div>
    </>
  );
};
