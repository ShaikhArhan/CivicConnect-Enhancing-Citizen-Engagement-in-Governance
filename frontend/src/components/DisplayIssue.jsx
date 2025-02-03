import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../DisplayIssue.css';
import { useNavigate, useParams } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';

export const DisplayIssue = () => {
    const {issueStatus}= useParams()

    const [issues, setIssues] = useState([]);
    const [fetchIssuesStatus, setFetchIssuesStatus] = useState(["Accepted","Solved"])
    const [showModal, setShowModal] = useState(false);
    const [reportContent, setReportContent] = useState('');
    const [selectedIssue, setSelectedIssue] = useState(null);
    const navigate = useNavigate();

    const fetchIssues = async () => {
        const configIssues = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("authorization")
            },
            withCredentials: true,
        };
        try {
            // console.log("fetchIssuesStatus",fetchIssuesStatus.filter(status=>status==issueStatus));
            const issueStatusFatching =fetchIssuesStatus.filter(status=>status==issueStatus)
            console.log("issueStatusFatching",issueStatusFatching);
            
            // const getIssueData = await axios.get('http://localhost:3001/problem/getAllProblem', configIssues);
            const getIssueData = await axios.get(`http://localhost:3001/problem/getProblemById/Status/${issueStatusFatching}`, configIssues);
            setIssues(getIssueData.data.data);
        } catch (error) {
            console.error("Error fetching issues:", error);
        }
    };

    useEffect(() => {
        fetchIssues();
    }, [issueStatus]);

    const getTimeDifference = (uploadTime) => {
        const currentTime = Date.now();
        const uploadTimeMillis = Date.parse(uploadTime);
        const timeDifferenceSeconds = (currentTime - uploadTimeMillis) / 1000;

        const years = Math.floor(timeDifferenceSeconds / (3600 * 24 * 365));
        const days = Math.floor((timeDifferenceSeconds % (3600 * 24 * 365)) / (3600 * 24));
        const hours = Math.floor((timeDifferenceSeconds % (3600 * 24)) / 3600);
        const minutes = Math.floor((timeDifferenceSeconds % 3600) / 60);
        const seconds = Math.floor(timeDifferenceSeconds % 60);

        if (years > 0) {
            return `${years} year${years > 1 ? 's' : ''} ${days} day${days > 1 ? 's' : ''} ago`;
        } else if (days > 0) {
            return `${days} days ${hours} hours ago`;
        } else if (hours > 0) {
            return `${hours} hours ${minutes} minutes ago`;
        } else if (minutes > 0) {
            return `${minutes} minutes ${seconds} seconds ago`;
        } else {
            return `${seconds} seconds ago`;
        }
    };

    const handleReportClick = (issue) => {
        setSelectedIssue(issue);
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
        setReportContent('');
    };

    const handleReportSubmit = async () => {
        if (reportContent.trim() === '') {
            // alert('Please enter a report.');
            return;
        }

        const configIssue = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("authorization")
            },
            withCredentials: true
        };

        try {
            const updatedStatus = [...selectedIssue.Status, "Reported"];
            await axios.put(
                `http://localhost:3001/problem/updateProblemById/${selectedIssue._id}`,
                { Status: updatedStatus },
                configIssue
            );

            // alert('Report submitted successfully');
            handleModalClose();
            fetchIssues(); // Refresh issues to show updated status
        } catch (error) {
            console.error("Error submitting report:", error);
            alert('Error submitting report');
        }
    };

    return (
        <div className="container">
            <br /><br />
            <h1>Issues</h1>
            <div className="row">
                {issues?.map((issue, index) => (
                    <div key={index} className="col-md-4">
                        <div className="card mb-4 shadow-sm">
                            <img src={issue.ProblemImage} className="card-img-top" alt="Issue" />
                            <div className="card-body">
                                <p className="card-text">{issue.ProblemDescription}</p>
                                <p className="card-text">{issue.ProblemLocation}</p>
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="btn-group">
                                        <button
                                            type="button"
                                            className="btn btn-sm btn-outline-secondary"
                                            onClick={() => navigate(`/issue-detail/${issue._id}`)}>View</button>
                                        <button
                                            type="button"
                                            className="btn btn-sm btn-outline-secondary"
                                            onClick={() => handleReportClick(issue)}>Report</button>
                                    </div>
                                    <small className="text-muted">{getTimeDifference(issue.UploadTime)}</small>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <Modal show={showModal} onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Report Issue</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <textarea
                        className="form-control"
                        rows="4"
                        value={reportContent}
                        onChange={(e) => setReportContent(e.target.value)}
                        placeholder="Describe why you are reporting this issue"></textarea>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleModalClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleReportSubmit}>
                        Submit Report
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};








// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import '../DisplayIssue.css';
// import { useNavigate } from 'react-router-dom';
// import { Modal, Button } from 'react-bootstrap';

// export const DisplayIssue = () => {
//     const [issues, setIssues] = useState([]);
//     const [fetchIssuesAccepted, setFetchIssuesAccepted] = useState(["Accepted"])
//     const [showModal, setShowModal] = useState(false);
//     const [reportContent, setReportContent] = useState('');
//     const [selectedIssue, setSelectedIssue] = useState(null);
//     const navigate = useNavigate();

//     const fetchIssues = async () => {
//         const configIssues = {
//             headers: {
//                 "Content-Type": "application/json",
//                 "Authorization": "Bearer " + localStorage.getItem("authorization")
//             },
//             withCredentials: true,
//         };
//         try {
//             // const getIssueData = await axios.get('http://localhost:3001/problem/getAllProblem', configIssues);
//             const getIssueData = await axios.get(`http://localhost:3001/problem/getProblemById/Status/${fetchIssuesAccepted}`, configIssues);
//             setIssues(getIssueData.data.data);
//         } catch (error) {
//             console.error("Error fetching issues:", error);
//         }
//     };

//     useEffect(() => {
//         fetchIssues();
//     }, []);

//     const getTimeDifference = (uploadTime) => {
//         const currentTime = Date.now();
//         const uploadTimeMillis = Date.parse(uploadTime);
//         const timeDifferenceSeconds = (currentTime - uploadTimeMillis) / 1000;

//         const years = Math.floor(timeDifferenceSeconds / (3600 * 24 * 365));
//         const days = Math.floor((timeDifferenceSeconds % (3600 * 24 * 365)) / (3600 * 24));
//         const hours = Math.floor((timeDifferenceSeconds % (3600 * 24)) / 3600);
//         const minutes = Math.floor((timeDifferenceSeconds % 3600) / 60);
//         const seconds = Math.floor(timeDifferenceSeconds % 60);

//         if (years > 0) {
//             return `${years} year${years > 1 ? 's' : ''} ${days} day${days > 1 ? 's' : ''} ago`;
//         } else if (days > 0) {
//             return `${days} days ${hours} hours ago`;
//         } else if (hours > 0) {
//             return `${hours} hours ${minutes} minutes ago`;
//         } else if (minutes > 0) {
//             return `${minutes} minutes ${seconds} seconds ago`;
//         } else {
//             return `${seconds} seconds ago`;
//         }
//     };

//     const handleReportClick = (issue) => {
//         setSelectedIssue(issue);
//         setShowModal(true);
//     };

//     const handleModalClose = () => {
//         setShowModal(false);
//         setReportContent('');
//     };

//     const handleReportSubmit = async () => {
//         if (reportContent.trim() === '') {
//             // alert('Please enter a report.');
//             return;
//         }

//         const configIssue = {
//             headers: {
//                 "Content-Type": "application/json",
//                 "Authorization": "Bearer " + localStorage.getItem("authorization")
//             },
//             withCredentials: true
//         };

//         try {
//             const updatedStatus = [...selectedIssue.Status, "Reported"];
//             await axios.put(
//                 `http://localhost:3001/problem/updateProblemById/${selectedIssue._id}`,
//                 { Status: updatedStatus },
//                 configIssue
//             );

//             // alert('Report submitted successfully');
//             handleModalClose();
//             fetchIssues(); // Refresh issues to show updated status
//         } catch (error) {
//             console.error("Error submitting report:", error);
//             alert('Error submitting report');
//         }
//     };

//     return (
//         <div className="container">
//             <br /><br />
//             <h1>Issues</h1>
//             <div className="row">
//                 {issues?.map((issue, index) => (
//                     <div key={index} className="col-md-4">
//                         <div className="card mb-4 shadow-sm">
//                             <img src={issue.ProblemImage} className="card-img-top" alt="Issue" />
//                             <div className="card-body">
//                                 <p className="card-text">{issue.ProblemDescription}</p>
//                                 <p className="card-text">{issue.ProblemLocation}</p>
//                                 <div className="d-flex justify-content-between align-items-center">
//                                     <div className="btn-group">
//                                         <button
//                                             type="button"
//                                             className="btn btn-sm btn-outline-secondary"
//                                             onClick={() => navigate(`/issue-detail/${issue._id}`)}>View</button>
//                                         <button
//                                             type="button"
//                                             className="btn btn-sm btn-outline-secondary"
//                                             onClick={() => handleReportClick(issue)}>Report</button>
//                                     </div>
//                                     <small className="text-muted">{getTimeDifference(issue.UploadTime)}</small>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 ))}
//             </div>

//             <Modal show={showModal} onHide={handleModalClose}>
//                 <Modal.Header closeButton>
//                     <Modal.Title>Report Issue</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     <textarea
//                         className="form-control"
//                         rows="4"
//                         value={reportContent}
//                         onChange={(e) => setReportContent(e.target.value)}
//                         placeholder="Describe why you are reporting this issue"></textarea>
//                 </Modal.Body>
//                 <Modal.Footer>
//                     <Button variant="secondary" onClick={handleModalClose}>
//                         Close
//                     </Button>
//                     <Button variant="primary" onClick={handleReportSubmit}>
//                         Submit Report
//                     </Button>
//                 </Modal.Footer>
//             </Modal>
//         </div>
//     );
// };
