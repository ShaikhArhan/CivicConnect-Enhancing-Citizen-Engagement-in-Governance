import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const Otp = () => {
    const { auth } = useParams();
    const navigate = useNavigate();

    const name = localStorage.getItem('username');
    const phone = localStorage.getItem('phone');

    const [otp, setOtp] = useState("");
    const [timer, setTimer] = useState(60);
    const [showResend, setShowResend] = useState(false);

    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => {
                setTimer(timer - 1);
            }, 1000);
            return () => clearInterval(interval);
        } else {
            setShowResend(true);
        }
    }, [timer]);

    const handleResendOtp = async () => {
        setShowResend(false);
        setTimer(60);

        // Add your resend OTP logic here
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            };
            // const otpResponse = await axios.post("http://localhost:3001/otp/resendOtp", { phoneNumber: phone }, config);
            const otpResponse = await axios.post("http://localhost:3001/otp/sendOtp",{ phoneNumber: phone },config);
            if (otpResponse.data.success) {
                toast('✅ OTP resent successfully', {
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
        } catch (err) {
            console.log("Error in resending OTP", err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const otpData = {
            phoneNumber: phone,
            otp: otp,
        };
        const Data = {
            name: name,
            phoneNo: phone,
        };
        const configOtp = {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        };
        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("authorization"),
            },
            withCredentials: true,
        };
        try {
            const otpResponse = await axios.post("http://localhost:3001/otp/verifyOtp", otpData, configOtp);
            if (otpResponse.data.success === true && auth === "register") {
                const response = await axios.post("http://localhost:3001/auth/registration", Data, config);
                if (response.status === 200) {
                    toast('✅ SignUp successfully', {
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
                        navigate("/login");
                    }, 3100);
                }
            } else if (otpResponse.data.success === true && auth === "login") {
                const response = await axios.post("http://localhost:3001/auth/login", Data, config);
                if (response.status === 200) {
                    localStorage.setItem("authorization", response.data.token);
                    toast('✅ Login successfully', {
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
                        navigate("/UserProfile");
                    }, 3100);
                }
            }
        } catch (err) {
            console.log("userSideOtp--" + err);
        } finally {
            localStorage.removeItem('username');
            localStorage.removeItem('phone');
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
                        <h4 className="card-title my-3 text-center bold text-dark">OTP Verification</h4>
                        <p>OTP has been sent to: {phone}</p>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text myicon"> <i className="fa fa-key"></i> </span>
                                </div>
                                <input name="" className="form-control" placeholder="OTP Number" type="text" onChange={(e) => setOtp(e.target.value)} required />
                            </div>
                            <div className="form-group">
                                <button type="submit" className="btn btn-primary btn-block bold"> Verify </button>
                            </div>
                        </form>
                        {showResend ? (
                            <div className="form-group">
                                <button onClick={handleResendOtp} className="btn btn-secondary btn-block bold"> Resend OTP </button>
                            </div>
                        ) : (
                            <p>Resend OTP in {timer} seconds</p>
                        )}
                    </article>
                </div>
            </div>
        </>
    );
};
