import { jwtDecode } from 'jwt-decode';
import { UserLayout } from './UserLayout';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { AdminLayout } from './Admin/AdminLayout';
import { Route, Routes } from 'react-router-dom';

export const AppLayout = () => {
    // const [infoRole, setInfoRole] = useState("Admin");



    // useEffect(() => {
    //     const config = {
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         withCredentials: true
    //     };
    //     const verifyRole = async () => {
    //         try {
    //             const token = localStorage.getItem('authorization');
    //             if (token) {
    //                 const decoded = jwtDecode(token);
    //                 // console.log("decoded", decoded.Role);
    //                 const roleResponse = await axios.get(`http://localhost:3001/role/getRoleById/${decoded.Role}`, config);
    //                 // console.log("role", roleResponse.data.data.RoleName);
    //                 setInfoRole(roleResponse.data.data.RoleName);
    //             } else {
    //                 console.error("No token found");
    //             }
    //         } catch (error) {
    //             console.error("Error verifying role", error);
    //         }
    //     };
    //     verifyRole();
    // }, []);

    // useEffect(() => {
    //     console.log("infoRole", infoRole);
    // }, [infoRole]); 

    return (
        <>
            <Routes>
                <Route path="/*" element={<UserLayout />}></Route>
                <Route path="/admin/*" element={<AdminLayout />}></Route>
            </Routes>
            {/* <UserLayout/> */}
            {/* {infoRole ==="Admin" ? <AdminLayout/> : <UserLayout/>} */}
        </>
    );
};
