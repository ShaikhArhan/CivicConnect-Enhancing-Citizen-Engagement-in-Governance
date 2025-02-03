import React, { useEffect, useState } from 'react'
import Header from './Header';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Home } from './Home';
import { AboutUs } from './AboutUs';
// import { LocationTest } from './LocationTest';
// import { CameraTest } from './CameraTest';
import { DisplayIssue } from './DisplayIssue';
import { UploadIssue } from './UploadIssue';
import { Otp } from './Otp';
import { Registration } from './Registration';
import { Login } from './Login';
import { ErrorPage } from "./ErrorPage";
import { IssueDetail } from './IssueDetail';
import { UserProfile } from './UserProfile';
import { UpdateIssue } from './UpdateIssue';
import { CivicBot } from './CivicBot';
import { Footer } from './Footer';
import { Rough } from './Rough';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';


export const UserLayout = () => {
    const location = useLocation();
    const [login, setLogin] = useState(false);
    const [register, setRegister] = useState(false);

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
                const accountPresent = await axios.get(`http://localhost:3001/user/getUserById/UserPhoneNo/${tokenDecoded.UserPhoneNo}`);
                // console.log("accountPresent.data.data",accountPresent.data.data)
                if (tokenDecoded.UserPhoneNo == accountPresent.data.data.UserPhoneNo) {
                    setRegister(true);
                }
            }
        } catch (err) {
            console.error(err)
        }
    };
    return (
        <>
            <Header key={register?null:location.pathname} />
            {/* <CivicBot/> */}
            <Routes>
                <Route path='/' element={<Home />}></Route>
                <Route path='/home' element={<Home />}></Route>
                <Route path='/about' element={<AboutUs />}></Route>
                {/* <Route path='/LocationTest' element={<LocationTest />}></Route> */}
                {/* <Route path='/CameraTest' element={<CameraTest />}></Route> */}
                <Route path='/UserProfile' element={<UserProfile />}></Route>
                <Route path='/display-issue/:issueStatus' element={<DisplayIssue />}></Route>
                {/* <Route path='/unsolved-issue/:issueStatus' element={<DisplayIssue />}></Route>                 */}
                <Route path='/upload-issue' element={<UploadIssue />}></Route>
                <Route path='/issue-detail/:id' element={<IssueDetail />}></Route>
                <Route path='/UpdateIssue/:id' element={<UpdateIssue />}></Route>
                <Route path='/otp/:auth' element={<Otp />}></Route>

                <Route path='/login' element={<Login />}></Route>
                <Route path='/registration' element={<Registration />}></Route>
                <Route path='/*' element={<ErrorPage />}></Route>

                <Route path='/rough' element={<Rough />}></Route>

            </Routes>
            {/* <Footer/> */}
        </>
    )
}
