import React, { useState, useRef, useEffect } from 'react';
import '../UpdateIssue.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

export const UpdateIssue = () => {
  const [issue, setIssue] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [status, setStatus] = useState(["Unseen"])

  const { id } = useParams();

  const descriptionRef = useRef(null);
  const addressRef = useRef(null);

  const navigate = new useNavigate();

  const configIssue = {
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + localStorage.getItem("authorization")
    },
    withCredentials: true
  };

  const adjustTextareaHeight = (textarea) => {
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  useEffect(() => {
    fetchIssue();
  }, []);

  useEffect(() => {
    adjustTextareaHeight(descriptionRef.current);
  }, [description]);

  useEffect(() => {
    adjustTextareaHeight(addressRef.current);
  }, [address]);

  const fetchIssue = async () => {
    try {
      const issueResponse = await axios.get(`http://localhost:3001/problem/getProblemById/_id/${id}`, configIssue);
      const issueData = issueResponse.data.data[0];
      setIssue(issueData);
      setDescription(issueData.ProblemDescription);
      setAddress(issueData.ProblemLocation);
    } catch (error) {
      console.error("Error fetching the issue:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updateingData = {
      ProblemDescription: description,
      ProblemLocation: address,
      Status: status,
      UploadTime: Date.now()
    };
    // console.log("Data to send: ", data);
    try {
      const updateIssueResponse = await axios.put(`http://localhost:3001/problem/updateProblemById/${id}`, updateingData, configIssue);
      // console.log("updateIssueResponse", updateIssueResponse);
      if (updateIssueResponse) {
        toast('✔️ Updated', {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setTimeout(() => {
          navigate("/UserProfile");
        }, 2550);
      }
      else {
        toast('❌ Not Updated', {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      console.error("Error updating the issue:", error);
    }
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
      <div className="update-issue-container">
        <h2>Update Issue</h2>
        <div id='issueImage'>
          <img src={issue.ProblemImage} alt="Issue image" />
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Address:</label>
            <textarea
              rows="1"
              placeholder={issue.ProblemLocation}
              ref={addressRef}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            ></textarea>
          </div>
          <div>
            <label>Description:</label>
            <textarea
              rows="1"
              placeholder={issue.ProblemDescription}
              ref={descriptionRef}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <button type="submit">Update Issue</button>
        </form>
      </div>
    </>
  );
};
