import React, { useState, useRef, useEffect } from 'react';
import '../UploadIssue.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { jwtDecode } from 'jwt-decode';

export const UploadIssue = () => {
  const navigate = useNavigate()
  const videoRef = useRef(null);
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [photoData, setPhotoData] = useState('');
  const [status, setStatus] = useState(['Unseen']);
  const [loading, setLoading] = useState(false);
  const videoWidth = 320; // Set desired width for video
  const videoHeight = 240; // Set desired height for video

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const capturePhoto = () => {
    const canvas = document.createElement('canvas');
    const video = videoRef.current;
    canvas.width = videoWidth;
    canvas.height = videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
    canvas.toBlob(blob => {
      setPhotoData(blob); // Store the captured photo data (Blob) in state
    }, 'image/png');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true to disable the button

    const token = localStorage.getItem('authorization');

    if (!token) {
      toast('⚠️ Login the Account ', {
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
        navigate("/login");
      }, 2550);
      setLoading(false); // Re-enable the button if there is no token
      return;
    }

    let tokenDecoded;
    try {
      tokenDecoded = jwtDecode(token);
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
      setLoading(false); // Re-enable the button if the token is invalid
      return;
    }

    try {
      const accountPresent = await axios.get(`http://localhost:3001/user/getUserById/UserPhoneNo/${tokenDecoded.UserPhoneNo}`);

      if (!accountPresent.data || !accountPresent.data.data || !accountPresent.data.data.UserPhoneNo) {
        toast('⚠️ Account not registered', {
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
          navigate("/registration");
        }, 2550);
        setLoading(false); // Re-enable the button if the account is not registered
        return;
      }

      const formData = new FormData();
      formData.append('file', photoData);
      formData.append('upload_preset', 'Issues');

      const cloudinaryResponse = await axios.post('https://api.cloudinary.com/v1_1/dt8wopnyx/image/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (cloudinaryResponse) {
        const issueData = {
          UserID: tokenDecoded._id,
          ProblemImage: cloudinaryResponse.data.secure_url,
          ProblemDescription: description,
          ProblemLocation: location,
          Status: status,
          UploadTime: Date.now()
        };

        const configIssues = {
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("authorization"),
          },
          withCredentials: true,
        };

        try {
          const issueResponse = await axios.post("http://localhost:3001/problem/addProblem", issueData, configIssues);
          if (issueResponse.status === 200) {
            toast('✔️ Issue Uploaded', {
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
              navigate("/display-issue");
            }, 2550);
          }
        } catch (error) {
          console.log("UploadIssue-issueResponse--", error);
        }
      }
    } catch (error) {
      console.error('Error uploading photo to Cloudinary:', error);
    }

    setLoading(false); // Re-enable the button after the submission completes
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
      <br /><br /><br /><br /><br />
      <div className="container-fluid make-f pt-5" id="uploadContainer">
        <div className="make-f upload-cont pt-3">
          <p className="bold text-light upload-title">Upload Your Image Here!</p>
          <div className="card bg-light shadow">
            <video ref={videoRef} autoPlay className="card-img-top" width={videoWidth} height={videoHeight} />
            <div className="card-body upload-border">
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
                <div className="d-grid gap-2">
                  <div style={{ display: "flex", gap: "1em" }}>
                    <button type="button" className="btn btn-primary bold" onClick={startCamera}>Start Camera</button>
                    <button type="button" className="btn btn-primary bold capture-btn" onClick={capturePhoto}>Capture Photo</button>
                  </div>
                  <div>
                    {photoData && <img src={URL.createObjectURL(photoData)} alt="Captured" />} {/* Display captured image */}
                  </div>

                  <div className="d-md-flex justify-content-between mb-3">
                    <div className="mx-1 flex-grow-1">
                      <label htmlFor="addressInput" className="form-label">Address</label>
                      <input type="text" className="form-control" id="addressInput" onChange={(e) => setLocation(e.target.value)} />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="descriptionInput" className="form-label">Description</label>
                    <textarea className="form-control tarea" id="descriptionInput" rows="3" onChange={(e) => setDescription(e.target.value)}></textarea>
                  </div>
                </div>
                <div className="form-group">
                  <button type="submit" className="btn btn-primary btn-block bold" disabled={loading}> {/* Disable the button when loading */}
                    {loading ? 'Submitting...' : 'Submit'} {/* Show 'Submitting...' when loading */}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
