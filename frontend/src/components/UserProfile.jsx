import React, { useEffect, useRef, useState } from 'react';
import '../UserProfile.css';
import { jwtDecode } from 'jwt-decode';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const UserProfile = () => {
    const [info, setInfo] = useState('');
    const [issues, setIssues] = useState([]);
    const navigate = useNavigate();

    const configIssue = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("authorization")
        },
        withCredentials: true
    };

    useEffect(() => {
        infoLoad();
    }, []);

    const infoLoad = async () => {
        try {
            const token = localStorage.getItem('authorization');
            if (token) {
                try {
                    const decoded = jwtDecode(token);
                    setInfo(decoded);
                    // console.log("tokenDecoded", decoded);
                    await fetchIssues(decoded);
                } catch (error) {
                    console.error('Invalid token:', error);

                    toast('⚠️ Please login again, invalid account', {
                        position: "top-right",
                        autoClose: 4000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                    setTimeout(() => {
                        navigate("/login");
                    }, 4050);
                    return;
                }
            }
        } catch (error) {
            console.log("UserProfile- err- ", error);
        }
    };

    const Login = () => {
        setTimeout(() => {
            navigate("/login");
        }, 200);
    };

    const Registration = () => {
        setTimeout(() => {
            navigate("/registration");
        }, 200);
    };

    const fetchIssues = async (userInfo) => {
        try {
            const getIssues = await axios.get(`http://localhost:3001/problem/getProblemById/UserID/${userInfo._id}`, configIssue);
            setIssues(getIssues.data.data);
            // console.log("issues", getIssues.data.data);
        } catch (error) {
            console.error("Failed to fetch issues:", error);
        }
    };

    const getTimeDifference = (uploadTime) => {
        const currentTime = Date.now();
        const uploadTimeMillis = Date.parse(uploadTime); // Convert to milliseconds
        const timeDifferenceSeconds = (currentTime - uploadTimeMillis) / 1000; // Difference in seconds

        const years = Math.floor(timeDifferenceSeconds / (3600 * 24 * 365));
        const days = Math.floor((timeDifferenceSeconds % (3600 * 24 * 365)) / (3600 * 24));
        const hours = Math.floor((timeDifferenceSeconds % (3600 * 24)) / 3600);
        const minutes = Math.floor((timeDifferenceSeconds % 3600) / 60);
        const seconds = Math.floor(timeDifferenceSeconds % 60);

        if (years > 0) {
            return `${years} year${years > 1 ? 's' : ''} ${days} day${days > 1 ? 's' : ''} ago`;
        } else if (days > 0) {
            return `${days} day${days > 1 ? 's' : ''} ${hours} hour${hours > 1 ? 's' : ''} ago`;
        } else if (hours > 0) {
            return `${hours} hour${hours > 1 ? 's' : ''} ${minutes} minute${minutes > 1 ? 's' : ''} ago`;
        } else if (minutes > 0) {
            return `${minutes} minute${minutes > 1 ? 's' : ''} ${seconds} second${seconds > 1 ? 's' : ''} ago`;
        } else {
            return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
        }
    };

    const textareaRef = useRef(null);

    const adjustTextareaHeight = (textarea) => {
        if (textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
    };

    const handleTextareaRef = (textarea) => {
        textareaRef.current = textarea;
        adjustTextareaHeight(textarea);
    };

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={2500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <br /><br />
            <div id='container'>
                <div id='info' style={{ backgroundColor: "#0d4169" }}>
                    <div id='detail'>
                        <div id="name" className='personDetail'>
                            <span className="label" style={{ color: "white" }}>Name :</span>
                            <input className="inputField" type="text" value={info.UserName || ''} readOnly />
                        </div>
                        <div id="phoneNo" className='personDetail'>
                            <span className="label" style={{ color: "white" }}>Phone No :</span>
                            <input className="inputField" type="text" value={info.UserPhoneNo || ''} readOnly />
                        </div>
                    </div>
                    <div id="account">
                        <button id='login' type="button" onClick={Login}>Login</button>
                        <button id='register' type="button" onClick={Registration}>Create Account</button>
                    </div>
                </div>

                <div style={{ width: "auto", border: "2px solid ", borderRadius: "20px", margin: "1%" }}></div>

                <div id="uploadHistory">
                    <h2>Your Uploads</h2>
                    <hr style={{ margin: "0% 45%", border: "0.5px solid black" }} />
                    {
                        issues.length === 0 ? (
                            <h1>No Uploads Found</h1>
                        ) : (
                            issues.map((issue, index) => (
                                <div key={index} id='uploadedIssue'>
                                    <div id="issueDetail">
                                        <div className="container-fluid container-bg">
                                            <div className="row">
                                                <div className="col-md-6 image-container p-3">
                                                    <img src={issue.ProblemImage} alt="Issue image" />
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="details-container">
                                                        <div className="details" style={{ border: "none" }}>
                                                            <p><strong>Address:</strong>
                                                                <textarea
                                                                    ref={handleTextareaRef}
                                                                    className="auto-resize-textarea"
                                                                    rows="1"
                                                                    value={issue.ProblemLocation}
                                                                    readOnly
                                                                />
                                                            </p>
                                                            <p><strong>Description:</strong>
                                                                <textarea
                                                                    ref={handleTextareaRef}
                                                                    className="auto-resize-textarea"
                                                                    rows="1"
                                                                    value={issue.ProblemDescription}
                                                                    readOnly
                                                                />
                                                            </p>
                                                            <p><strong>Location:</strong> Latitude: 40.7128, Longitude: -74.0060</p>
                                                        </div>
                                                        <p className="update-ago"><strong>Last Updated:</strong> {getTimeDifference(issue.UploadTime)}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div id='update'>
                                        <div id='updateBtn'>
                                            <button type="button" onClick={(e) => { navigate(`/UpdateIssue/${issue._id}`) }}>Update</button>
                                        </div>
                                        <div className='divider'></div>
                                        <div id='status'>
                                            <span style={{ color: "whitesmoke", marginRight: "0.5rem", letterSpacing: "1px" }}>Status:</span>
                                            <div id='statusDisplay'>
                                                {
                                                    issue.Status.map((status, index) => {
                                                        if (status === "Accepted") {
                                                            return (<span key={index} className={`${status}`} style={{ color: '#19a519' }}> {status} </span>)
                                                        }
                                                        return (
                                                            <span key={index} className={`${status}`}> {status} </span>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )
                    }
                </div>
            </div>
        </>
    );
};
