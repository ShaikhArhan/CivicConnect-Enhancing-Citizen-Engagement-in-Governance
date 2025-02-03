import React, { useEffect, useState } from 'react'
import { Login } from './Login'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { DisplayIssue } from './DisplayIssue'
import { ErrorPage } from './ErrorPage'
import { Header } from './Header'
import { Profile } from './Profile'
import { Registration } from './Registration'
import { UpdateAdmin } from './UpdateAdmin'
import { DeleteAdmin } from './DeleteAdmin'
import { DeleteIssue } from './DeleteIssue'
import { AdminControll } from './AdminControll'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import "./css/AdminLayout.css"
import 'bootstrap/dist/css/bootstrap.min.css';

export const AdminLayout = () => {
  const location = useLocation();
  const [login, setLogin] = useState(false);
  const [register, setRegister] = useState(false);
  const [info, setInfo] = useState("");
  const [permition, setPermition] = useState([]);
  const navigate = useNavigate()

  
  useEffect(() => {
    verification();
  }, [location.pathname]);

  const verification = async () => {
    try {
      const token = localStorage.getItem('authorization');
      if (token) {
        setLogin(true);
        const tokenDecoded = jwtDecode(token);

        const accountPresent = await axios.get(`http://localhost:3001/admin/getAdminByAny/AdminUserName/${tokenDecoded.AdminUserName}`);
        const adminData = accountPresent.data.data[0];
        setInfo(adminData);
        setPermition(adminData.AdminRole.RolePermission);

        if (tokenDecoded.AdminPassword === adminData.AdminPassword) {
          setRegister(true);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Header key={location.pathname} />
      <Routes >
        <Route path="login" element={<Login />} />
        {
          login && register ? (
            <>            
              <Route path="/" element={<Profile />} />
              <Route path="Profile" element={<Profile />} />

              {permition.includes("varifyProblem") ? (                
                <Route path="display-issue" element={<DisplayIssue />} />
              ) : null}

              {permition.includes("DeleteProblem") ? (
                <Route path="display-issue/delete-issue/:deleteId" element={<DeleteIssue />} />
              ) : null}

              {permition.includes("adminControll") ? (
                <Route path="admin-controll" element={<AdminControll />} />
              ) : null}

              {permition.includes("RegistrationAdmin") ? (
                <Route path="admin-controll/registration" element={<Registration />} />
              ) : null}

              {permition.includes("UpdateAdmin") ? (
                <Route path="admin-controll/update-admin/:adminId" element={<UpdateAdmin />} />
              ) : null}

              {permition.includes("DeleteAdmin") ? (
                <Route path="admin-controll/delete-admin/:adminId" element={<DeleteAdmin />} />
              ) : null}
            </>
          ) : null
        }
        <Route path="/*" element={<ErrorPage />} />
      </Routes>
    </>
  );
};
