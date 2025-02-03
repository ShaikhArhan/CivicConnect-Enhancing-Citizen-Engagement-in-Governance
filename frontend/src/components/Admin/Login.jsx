import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../Login.css";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const Login = () => {
    const navigate = useNavigate();
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const configAdmin = {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true
        };
        const dataAdmin = {
            "adminUserName": userName,
            "password": password
        }

        try {
            const accountPresent = await axios.post("http://localhost:3001/auth/login", dataAdmin, configAdmin);

            if (accountPresent.data.success === true) {
                const token = accountPresent.data.token;
                localStorage.setItem("authorization", token);
                toast('🔐 Login successful', {
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
                    navigate("/admin/Profile");
                }, 3000);
            } else {
                toast('❌ Login failed', {
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
            console.error("Error during login: ", error);
            toast('❌ Error during login', {
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

        setLoading(false);
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
                                    <span className="input-group-text myicon"> <i className="fa fa-user"></i> </span>
                                </div>
                                <input
                                    className="form-control"
                                    placeholder="Username"
                                    type="text"
                                    onChange={(e) => setUserName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text myicon"> <i className="fa fa-lock"></i> </span>
                                </div>
                                <input
                                    className="form-control"
                                    placeholder="Password"
                                    type="password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <button type="submit" className="btn btn-primary btn-block bold" disabled={loading}>
                                    {loading ? 'Logging in...' : 'Login'}
                                </button>
                            </div>
                        </form>
                    </article>
                </div>
            </div>
        </>
    );
};
