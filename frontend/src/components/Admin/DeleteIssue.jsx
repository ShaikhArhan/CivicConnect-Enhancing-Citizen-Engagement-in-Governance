import React, { useEffect, useState } from 'react';
import './css/DeleteIssue.css';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

export const DeleteIssue = () => {
    const { deleteId } = useParams();
    const [issue, setIssue] = useState('');
    const [deleteConform, setDeleteConform] = useState("")
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()


    const fetchIssueId = async () => {
        const getIssueData = await axios.get(`http://localhost:3001/problem/getProblemById-admin/_id/${deleteId}`)
        setIssue(getIssueData.data.data[0])
    }
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

    useEffect(() => {
        fetchIssueId()
    }, [])

    const handleDelete = async (id) => {
        // const response = await axios.delete(`http://localhost:3001/problem/deleteProblemById-admin/_id/${id}`)
        // setDeleteConform("Issue deleted successfully")
        try {
            if (deleteConform === "DELETE") {
                const deleteResponse = await axios.delete(`http://localhost:3001/problem/deleteProblem/${id}`)
                console.log("deleteResponse", deleteResponse);

                if (deleteResponse && deleteResponse != "" || undefined || null) {
                    toast(`✅ ${deleteResponse.data.message}`, {
                        position: "top-right",
                        autoClose: 2500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        toastStyle: {
                            whiteSpace: "normal",
                        },
                    });
                    setDeleteConform("")
                    setTimeout(() => {
                        navigate("/admin/display-issue");
                    }, 2600);
                }
                else if (deleteResponse.data.success === false) {
                    toast(`⚠️ ${deleteResponse.data.message}`, {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        toastStyle: {
                            whiteSpace: "normal",
                        },
                    });
                }
            } else if (deleteConform != "DELETE") {
                setDeleteConform("")
                toast('🚫 Write "DELETE" in Conformation', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    toastStyle: {
                        whiteSpace: "normal",
                    },
                });
            }
        } catch (error) {
            console.error('There was an error deleting the admin!');
            toast(<div><span style={{ color: "red" }}>Error,</span> Something Went Wrong <span style={{ color: "red" }}>!!</span></div>, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                toastStyle: {
                    whiteSpace: "normal",
                },
            });
        }
    }
    // if (loading) return <p>Loading...</p>;

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
            <div className="container-fluid container-bg">
                <br /><br /><br />
                <h2 style={{display:"flex",justifyContent:"left", color:"red"}}>Delete Issue</h2>
                <hr />
                <div className="row">
                    <div className="col-md-6 image-container p-3">
                        <img src={issue.ProblemImage} alt="Image" />
                    </div>
                    <div className="col-md-6">
                        <div className="details-container">
                            <div className="details" style={{ border: "none" }}>
                                <p><strong>Description:</strong>{issue.ProblemDescription} </p>
                                <p><strong>Address:</strong> {issue.ProblemLocation}</p>
                                <p><strong>Location:</strong> Latitude: 40.7128, Longitude: -74.0060</p>
                            </div>
                            <p className="update-ago"><strong>Last Updated:</strong>{getTimeDifference(issue.UploadTime)}</p>
                        </div>
                    </div>
                </div>
                <div id='delete-container'>
                    <div className="form-group">
                        <label>Type "DELETE" to confirm:</label>
                        <input style={{ width: "50%" }} type="text" placeholder='DELETE' value={deleteConform} onChange={(e) => { setDeleteConform(e.target.value) }} />
                    </div>
                    {deleteConform === "DELETE" ? <button type="submit" onClick={() => { handleDelete(deleteId) }} className="submit-btn">Delete</button> : null}
                    <br />
                </div>
            </div>
        </>
    );
};
