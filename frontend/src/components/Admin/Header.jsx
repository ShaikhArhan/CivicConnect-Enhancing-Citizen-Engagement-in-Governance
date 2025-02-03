// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import "../../Header.css";
// import axios from "axios";
// import { jwtDecode } from "jwt-decode";

// export const Header = () => {
//     const [login, setLogin] = useState(false);
//     const [register, setRegister] = useState(false);
//     const [info, setInfo] = useState("");
//     const [permition, setPermition] = useState([]);

//     useEffect(() => {
//         verification();
//     }, []);

//     const verification = async () => {
//         try {
//             const token = localStorage.getItem("authorization");
//             if (token) {
//                 setLogin(true);
//                 const tokenDecoded = jwtDecode(token);
//                 const accountPresent = await axios.get(
//                     `http://localhost:3001/admin/getAdminByAny/AdminUserName/${tokenDecoded.AdminUserName}`
//                 );
//                 const adminData = accountPresent.data.data[0];
//                 await setInfo(adminData);
//                 await setPermition(adminData.AdminRole.RolePermission);

//                 if (tokenDecoded.AdminPassword === adminData.AdminPassword) {
//                     setRegister(true);
//                 }
//             }
//         } catch (err) {
//             console.error(err);
//         }
//     };

//     return (
//         <nav className="navbar-admin navbar-expand-sm fixed-top">
//             <div className="container-fluid">
//                 <button
//                     type="button"
//                     className="navbar-toggler-admin btn btn-primary justify-content-end"
//                     data-bs-toggle="collapse"
//                     data-bs-target="#collapsednavbar-admin"
//                 >
//                     <span className="navbar-toggler-icon"></span>
//                 </button>
//                 <div
//                     className="collapse navbar-collapse justify-content-start px-2"
//                     id="collapsednavbar-admin"
//                 >
//                     <ul className="navbar-nav-admin fontlight-admin">
//                         {login && register ? (
//                             <li id="profileButton-admin" className="nav-item-admin">
//                                 <Link to="Profile" className="nav-link-admin text-uppercase px-4">
//                                     Profile
//                                 </Link>
//                             </li>
//                         ) : null}
//                     </ul>
//                 </div>
//                 <div
//                     className="collapse navbar-collapse justify-content-end px-2"
//                     id="collapsednavbar-admin"
//                 >
//                     <ul className="navbar-nav-admin fontlight-admin">
//                         {!login || !register ? (
//                             <li id="loginButton-admin" className="nav-item-admin">
//                                 <Link to="login" className="nav-link-admin text-uppercase px-4">
//                                     Login
//                                 </Link>
//                             </li>
//                         ) : null}
//                         {login && register && permition.includes("varifyProblem") ? (
//                             <li className="nav-item-admin">
//                                 <Link to="display-issue" className="nav-link-admin text-uppercase px-4">
//                                     Displaying Issue
//                                 </Link>
//                             </li>
//                         ) : null}
//                         {login && register && permition.includes("adminControll") ? (
//                             <li className="nav-item-admin">
//                                 <Link to="admin-controll" className="nav-link-admin text-uppercase px-4">
//                                     Admin Controll
//                                 </Link>
//                             </li>
//                         ) : null}
//                     </ul>
//                 </div>
//             </div>
//         </nav>
//     );
// };









import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./css/Header.css";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; // Fix the import statement

export const Header = () => {
    const [login, setLogin] = useState(false);
    const [register, setRegister] = useState(false);
    const [info, setInfo] = useState("")
    const [permition, setPermition] = useState([])

    useEffect(() => {
        verification();
    }, []);

    const verification = async () => {
        try {
            const token = localStorage.getItem('authorization');
            if (token) {
                setLogin(true);
                const tokenDecoded = jwtDecode(token);
                // console.log("tokenDecoded",tokenDecoded)

                const accountPresent = await axios.get(`http://localhost:3001/admin/getAdminByAny/AdminUserName/${tokenDecoded.AdminUserName}`);
                // console.log("accountPresent", accountPresent.data.data[0].AdminRole.RolePermission)

                const adminData = accountPresent.data.data[0]
                await setInfo(accountPresent.data.data[0])
                await setPermition(adminData.AdminRole.RolePermission)

                // console.log("accountPresent",adminData.AdminPassword);
                // console.log("tokenDecoded",tokenDecoded.AdminPassword);
                if (tokenDecoded.AdminPassword === adminData.AdminPassword) {
                    setRegister(true);
                }
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <header className="custom-header" style={{ height: "60px" }}>
            <div className="header-content">
                <div className="profile">
                    {login && register ? (
                        <div className="nav-profile nav-field">
                            <Link to="Profile" className="nav-link text px-4">Profile</Link>
                        </div>
                    ) : null}
                </div>
                <nav className="nav-links">
                    {!login || !register ? (
                        <div className="nav-login nav-field"><Link to="login" className="nav-link text px-4">Login</Link></div>
                    ) : null}
                    {login && register && permition.includes("varifyProblem") ? (
                        <div className="nav-display-issue nav-field"><Link to="display-issue" className="nav-link text px-4">Displaying Issue</Link></div>
                    ) : null}
                    {login && register && permition.includes("adminControll") ? (
                        <div className="nav-admin-controll nav-field"><Link to="admin-controll" className="nav-link text px-4">Admin Controll</Link></div>
                    ) : null}
                </nav>
            </div>
        </header>

        // <nav className="navbar navbar-expand-sm fixed-top ">
        //     <div className="container-fluid" >
        //         <button
        //             type="button"
        //             className="navbar-toggler btn btn-primary justify-content-end"
        //             data-bs-toggle="collapse"
        //             data-bs-target="#collapsednavbar"
        //         >
        //             <span className="navbar-toggler-icon"></span>
        //         </button>
        //         <div className="collapse navbar-collapse justify-content-start px-2" id="collapsednavbar">
        //             <ul className="navbar-nav fontlight">
        //                 {login && register ? (
        //                     <li id="profileButton" className="nav-item">
        //                         <Link to="Profile" className="nav-link text-uppercase px-4">
        //                             Profile
        //                         </Link>
        //                     </li>
        //                 ) : null}
        //             </ul>
        //         </div>
        //         <div className="collapse navbar-collapse justify-content-end px-2" id="collapsednavbar">
        //             <ul className="navbar-nav fontlight">
        //                 {!login || !register ? (
        //                     <li id="loginButton" className="nav-item">
        //                         <Link to="login" className="nav-link text-uppercase px-4">
        //                             Login
        //                         </Link>
        //                     </li>
        //                 ) : null}
        //                 {login && register && permition.includes("varifyProblem") ? (
        //                     <>
        //                         <li className="nav-item">
        //                             <Link to="display-issue" className="nav-link text-uppercase px-4">
        //                                 Displaying Issue
        //                             </Link>
        //                         </li>
        //                     </>
        //                 ) : null}
        //                 {login && register && permition.includes("adminControll") ? (
        //                     <>
        //                         {/* {
        //                             permition.includes("RegistrationAdmin") ? (
        //                                 <li className="nav-item">
        //                                     <Link to="registration" className="nav-link text-uppercase px-4">
        //                                         Registration
        //                                     </Link>
        //                                 </li>
        //                             ) : null
        //                         } */}
        //                         <li className="nav-item">
        //                             <Link to="admin-controll" className="nav-link text-uppercase px-4">
        //                                 Admin Controll
        //                             </Link>
        //                         </li>
        //                     </>
        //                 ) : null}
        //             </ul>
        //         </div>
        //     </div>
        // </nav>
    );
}









// there is problem where the user header and admin header having same css file header.css , and having same classes and id ,because of that one of them viewing propely.
