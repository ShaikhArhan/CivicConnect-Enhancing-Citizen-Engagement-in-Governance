import React, { useEffect, useState } from 'react';
import '../IssueDetail.css';  // Assuming you place your CSS here
import axios from 'axios';
import { useParams } from 'react-router-dom';

export const IssueDetail = () => {
  const { id } = useParams()
  const [issue, setIssue] = useState('');

  const configIssue = {
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + localStorage.getItem("authorization")
    },
    withCredentials: true
  }

  const fetchIssueId = async () => {
    const getIssueData = await axios.get(`http://localhost:3001/problem/getProblemById/_id/${id}`, configIssue)
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

  return (
    <div className="container-fluid container-bg">
      <br /><br /><br />
      <div className="row">
        <div className="col-md-6 image-container p-3">
          <img src={issue.ProblemImage} alt="Image" />
        </div>
        <div className="col-md-6">
          <div className="details-container">
            <div className="details" style={{border:"none"}}>
              <p><strong>Description:</strong>{issue.ProblemDescription} </p>
              <p><strong>Address:</strong> {issue.ProblemLocation}</p>
              <p><strong>Location:</strong> Latitude: 40.7128, Longitude: -74.0060</p>
            </div>
            <p className="update-ago"><strong>Last Updated:</strong>{getTimeDifference(issue.UploadTime)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
