import React, { useEffect, useRef, useState } from 'react';
import '../../UserProfile.css';
import { jwtDecode } from 'jwt-decode';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AdminHistory } from './AdminHistory';

export const Profile = () => {
  const [info, setInfo] = useState('');
  const [role, setRole] = useState([]);
  const [issues, setIssues] = useState([]);

  const navigate = useNavigate();

  const specificRole = role
    .filter(roles => roles === "varifyProblem" || roles === "adminControll")
    .map(roles => roles === "varifyProblem" ? "Varify Issues" : "" || roles === "adminControll" ? "Admin Controls" : "");

  useEffect(() => {
    infoLoad();
  }, []);

  const infoLoad = async () => {
    try {
      const token = localStorage.getItem('authorization');
      if (token) {
        try {
          const tokenDecoded = jwtDecode(token);

          // const getRole = await axios.get(`http://localhost:3001/role/getRoleById/${decoded.AdminRole}`, configRole);
          const accountPresent = await axios.get(`http://localhost:3001/admin/getAdminByAny/AdminUserName/${tokenDecoded.AdminUserName}`);
          // console.log("accountPresent", accountPresent.data.data[0].AdminRole.RolePermission)
          setInfo(accountPresent.data.data[0]);
          setRole(accountPresent.data.data[0].AdminRole.RolePermission);

          // await fetchHistory(decoded);
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
            navigate("/admin/login");
          }, 4050);
        }
      } else {
        navigate("/admin/login");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const Login = () => {
    setTimeout(() => {
      navigate("/admin/login");
    }, 200);
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
      <div id='container' style={{marginTop:"5px"}}>
        <div id='info'>
          <div className='details'>
            <div id="name" className='personDetail'>
              <span className="label">Name :</span>
              {/* <input className="inputField" type="text" value={info.AdminName || ''} readOnly /> */}
              <textarea ref={handleTextareaRef} className="auto-resize-textarea inputField" rows="1" value={info.AdminName || ''} readOnly />

            </div>
            <div id="phoneNo" className='personDetail'>
              <span className="label">Phone No :</span>
              {/* <input className="inputField" type="text" value={info.AdminPhoneNo || ''} readOnly /> */}
              <textarea ref={handleTextareaRef} className="auto-resize-textarea inputField" rows="1" value={info.AdminPhoneNo || ''} readOnly />
            </div>
          </div>
          <div className='details'>
            <div id="userName" className='personDetail'>
              <span className="label">User name :</span>
              {/* <input className="inputField" type="text" value={info.AdminUserName || ''} readOnly /> */}
              <textarea ref={handleTextareaRef} className="auto-resize-textarea inputField" rows="1" value={info.AdminUserName || ''} readOnly />
            </div>
            <div id="password" className='personDetail'>
              <span className="label">Password :</span>
              <input className="inputField" type="password" value={info.AdminPassword || ''} readOnly />
              {/* <textarea ref={handleTextareaRef}  className="auto-resize-textarea inputField" rows="1" value={info.AdminPassword || ''} readOnly/> */}

            </div>
            <div id="permission" className='personDetail'>
              <span className="label">Permission :</span>
              {/* <input className="inputField" type="password" value={info.AdminPassword || ''} readOnly /> */}
              <textarea ref={handleTextareaRef} style={{ flexDirection: "column" }} className="auto-resize-textarea inputField" rows="1" value={specificRole.join(', ') || ''} readOnly />
            </div>
          </div>

          <div id="account">
            <button id='login' type="button" onClick={Login}>Login</button>
          </div>
        </div>
        <div style={{ width: "auto", border: "2px solid ", borderRadius: "20px", margin: "1%" }}></div>

        <div id="uploadHistory">
          <p style={{ float: "left", width: "auto" }}>
            <h3 >History</h3>
            <hr style={{ margin: "0% 5%", border: "0.5px solid black" }} />
          </p>
          <br />
          <br />
          <AdminHistory />
        </div>
      </div>
    </>
  );
};
