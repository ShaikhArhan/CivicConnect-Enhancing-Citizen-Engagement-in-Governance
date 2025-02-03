import React, { useState, useRef } from 'react';

export const CameraTest = () => {
  const videoRef = useRef(null);
  const [photoData, setPhotoData] = useState();

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
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/png');
    setPhotoData(dataUrl);
  };

  const savePhoto = () => {
    // Send photoData to backend for storage
  };

  return (
    <div>
      <video ref={videoRef} autoPlay />
      <button onClick={startCamera}>Start Camera</button>
      <button onClick={capturePhoto}>Capture Photo</button>
      {photoData && (
        <div>
          <img src={photoData} alt="Captured" />
          <button onClick={savePhoto}>Save Photo</button>
        </div>
      )}
    </div>
  );
};

// export default PhotoCapture;