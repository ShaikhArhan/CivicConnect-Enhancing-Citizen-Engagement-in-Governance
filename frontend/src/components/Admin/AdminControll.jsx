// import React, { useEffect, useState } from 'react'
// import { SearchBar } from './SearchBar'
// import "./css/AdminControll.css"
// import axios from 'axios'
// import { useNavigate } from 'react-router-dom'
// import { jwtDecode } from 'jwt-decode'

// export const AdminControll = () => {
//   const [info, setInfo] = useState('')
//   const [searchData, setSearchData] = useState([])
//   const [formData, setFormData] = useState([{
//     AdminId: '',
//     AdminRole: '',
//     AdminName: '',
//     AdminPhoneNo: '',
//     AdminUserName: '',
//     AdminPassword: '',
//     AdminAddress: '',
//     AdminRolePermission: '',
//     verificationIssues: [],
//     adminControls: []
//   }]);

//   const navigate = useNavigate()

//   useEffect(() => {
//     fatchAdmin();
//     fetchInfo();
//   }, []);

//   const fatchAdmin = async () => {
//     try {
//       const getAdmin = await axios.get("http://localhost:3001/admin/getAllAdmin");
//       const adminData = getAdmin.data.data;

//       const mappedData = adminData.map((admin) => ({
//         AdminId: admin._id,
//         AdminRole: admin.AdminRole || {}, // Add a fallback for undefined AdminRole
//         AdminName: admin.AdminName,
//         AdminPhoneNo: admin.AdminPhoneNo,
//         AdminUserName: admin.AdminUserName,
//         AdminPassword: admin.AdminPassword,
//         AdminAddress: admin.AdminAddress,
//         AdminRolePermission: admin.AdminRole?.RolePermission || [], // Ensure it's an array
//         verificationIssues: admin.AdminRole?.RolePermission?.filter(role => ["AcceptProblem", "RejectProblem", "UnseenProblem", "ReportProblem", "DeleteProblem", "UnSolvedProblem", "SolvedProblem"].includes(role)) || [],
//         adminControls: admin.AdminRole?.RolePermission?.filter(role => ["SearchAdmin", "RegistrationAdmin", "UpdateAdmin", "DeleteAdmin"].includes(role)) || []
//       }));

//       // !searchData || searchData.length == 0 || searchData == null || undefined ? setFormData(mappedData) : setFormData(searchData)
//       setFormData(mappedData) 
//     } catch (error) {
//       console.error("Error fetching admin data", error);
//     }
//   };

//   const fetchInfo = async () => {
//     try {
//       const tokenDecoded = jwtDecode(localStorage.getItem('authorization'));
//       const accountPresent = await axios.get(`http://localhost:3001/admin/getAdminByAny/AdminUserName/${tokenDecoded.AdminUserName}`);
//       setInfo(accountPresent.data.data[0]);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const checkingPoeration = (operation, id) => {
//     if (operation === "update") {
//       navigate(`update-admin/${id}`);
//     } else if (operation === "delete") {
//       navigate(`delete-admin/${id}`);
//     }
//   }

//   return (
//     <>
//       <div id='container'>
//         <div className='search-bar-container'>
//           <div id='search-bar'>
//             <SearchBar data={setSearchData} />
//           </div>
//           {console.log("searchData", searchData)}
//           <div id='registration-btn' >
//             {
//               info?.AdminRole?.RolePermission?.includes("RegistrationAdmin") ? (<button onClick={() => { navigate("registration") }}>Admin Registration</button>) : null
//             }
//           </div>
//         </div>
//         <div id='display-content'>
//           {(searchData.length>0?searchData:formData)?.map((admin, index) => (
//             <div key={index} id="admin">
//               <div id='display-admins-container'>
//                 <div className='admin-id'>
//                   Id: {admin.AdminId}
//                 </div>
//                 <hr />
//                 <table>
//                   <tbody>
//                     <tr>
//                       <th><div className='admin-info-name'>Name:</div></th>
//                       <td>{admin.AdminName}</td>
//                     </tr>
//                     <tr>
//                       <th><div className='admin-info-userName'>User-name:</div></th>
//                       <td>{admin.AdminUserName}</td>
//                     </tr>
//                     <tr>
//                       <th><div className='admin-info-phoneNumber'>Phone-number:</div></th>
//                       <td>{admin.AdminPhoneNo}</td>
//                     </tr>
//                     <tr>
//                       <th><div className='admin-info-address'>Address:</div></th>
//                       <td>{admin.AdminAddress}</td>
//                     </tr>
//                     <tr>
//                       <th><div className='admin-info-permitions'>Permissions:</div></th>
//                       <td>
//                         <div className="row-group">
//                           <div className="dropdown-container">
//                             <label>Verification Issues ({admin.verificationIssues?.length || 0} selected)</label>
//                             <div className="always-visible-dropdown">
//                               {/* {["AcceptProblem", "RejectProblem", "UnseenProblem", "ReportProblem"].map((issue) => (
//                                 <div key={issue} className="dropdown-item">
//                                   <input
//                                     type="checkbox"
//                                     checked={admin.verificationIssues?.includes(issue)}
//                                     disabled
//                                   />
//                                   {issue}
//                                 </div>
//                               ))} */}
//                               {["Unseen Issues", "Accepted Issues", "Rejected Issues", "Reported Issues", "Delete Issues", "Unsolved Issues", "Solved Issues"].map((issue) => (
//                                 <div key={issue} className="dropdown-item">
//                                   <input
//                                     type="checkbox"
//                                     value={issue === 'Unseen Issues' ? "UnseenProblem" : issue === 'Accepted Issues' ? "AcceptProblem" : issue === 'Rejected Issues' ? "RejectProblem" : issue === 'Reported Issues' ? "ReportProblem" : issue === 'Delete Issues' ? "DeleteProblem" : issue === 'Unsolved Issues' ? "UnSolvedProblem" : issue === 'Solved Issues' ? "SolvedProblem" : null}
//                                     checked={admin.verificationIssues.includes(issue === 'Unseen Issues' ? "UnseenProblem" : null || issue === 'Accepted Issues' ? "AcceptProblem" : null || issue === 'Rejected Issues' ? "RejectProblem" : null || issue === 'Reported Issues' ? "ReportProblem" : null || issue === 'Delete Issues' ? "DeleteProblem" : null || issue === 'Unsolved Issues' ? "UnSolvedProblem" : null || issue === 'Solved Issues' ? "SolvedProblem" : null)}
//                                     disabled
//                                   />
//                                   {issue}
//                                 </div>
//                               ))}
//                             </div>
//                           </div>
//                           <div className="dropdown-container">
//                             <label>Admin Controls ({admin.adminControls?.length || 0} selected)</label>
//                             <div className="always-visible-dropdown">
//                               {/* {["SearchAdmin", "RegistrationAdmin", "UpdateAdmin", "DeleteAdmin"].map((control) => (
//                                 <div key={control} className="dropdown-item">
//                                   <input
//                                     type="checkbox"
//                                     checked={admin.adminControls?.includes(control)}
//                                     disabled
//                                   />
//                                   {control}
//                                 </div>
//                               ))} */}
//                               {["Admin Search", "Admin Registration", "Admin Update", "Admin Delete"].map((control) => (
//                                 <div key={control} className="dropdown-item">
//                                   <input
//                                     type="checkbox"
//                                     value={control === 'Admin Search' ? "SearchAdmin" : control === 'Admin Registration' ? "RegistrationAdmin" : control === 'Admin Update' ? "UpdateAdmin" : control === 'Admin Delete' ? "DeleteAdmin" : null}
//                                     checked={admin.adminControls.includes(control === 'Admin Search' ? "SearchAdmin" : control === 'Admin Registration' ? "RegistrationAdmin" : control === 'Admin Update' ? "UpdateAdmin" : control === 'Admin Delete' ? "DeleteAdmin" : false)}
//                                     disabled
//                                   />
//                                   {control}
//                                 </div>
//                               ))}
//                             </div>
//                           </div>
//                         </div>
//                       </td>
//                     </tr>
//                   </tbody>
//                 </table>
//               </div>
//               <div id='operation-container'>
//                 <div className='operations'>
//                   {info?.AdminRole?.RolePermission?.includes("UpdateAdmin") ? (<button type="button" className='update-button' onClick={() => checkingPoeration("update", admin.AdminId)}>UPDATE</button>) : null}
//                   <br />
//                   {info?.AdminRole?.RolePermission?.includes("DeleteAdmin") ? (<button type="button" className='delete-button' onClick={() => checkingPoeration("delete", admin.AdminId)}>DELETE</button>) : null}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   )
// }

import React, { useEffect, useState } from 'react'
import { SearchBar } from './SearchBar'
import "./css/AdminControll.css"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'

export const AdminControll = () => {
  const [info, setInfo] = useState('');
  const [searchData, setSearchData] = useState([]);  // To store search results
  const [formData, setFormData] = useState([]);      // To store all admin data

  const navigate = useNavigate();

  useEffect(() => {
    fatchAdmin();   // Fetch all admins on page load
    fetchInfo();
  }, []);

  // Fetch all admins
  const fatchAdmin = async () => {
    try {
      const getAdmin = await axios.get("http://localhost:3001/admin/getAllAdmin");
      const adminData = getAdmin.data.data;

      const mappedData = adminData.map((admin) => ({
        AdminId: admin._id,
        AdminRole: admin.AdminRole || {}, // Ensure AdminRole is at least an empty object
        AdminName: admin.AdminName,
        AdminPhoneNo: admin.AdminPhoneNo,
        AdminUserName: admin.AdminUserName,
        AdminPassword: admin.AdminPassword,
        AdminAddress: admin.AdminAddress,
        AdminRolePermission: admin.AdminRole?.RolePermission || [], // Ensure it's an array
        verificationIssues: admin.AdminRole?.RolePermission?.filter(role => ["AcceptProblem", "RejectProblem", "UnseenProblem", "ReportProblem", "DeleteProblem", "UnSolvedProblem", "SolvedProblem"].includes(role)) || [],
        adminControls: admin.AdminRole?.RolePermission?.filter(role => ["RegistrationAdmin", "UpdateAdmin", "DeleteAdmin"].includes(role)) || []
      }));

      setFormData(mappedData);  // Initially display all admin data
    } catch (error) {
      console.error("Error fetching admin data", error);
    }
  };

  // Fetch logged-in admin info
  const fetchInfo = async () => {
    try {
      const tokenDecoded = jwtDecode(localStorage.getItem('authorization'));
      const accountPresent = await axios.get(`http://localhost:3001/admin/getAdminByAny/AdminUserName/${tokenDecoded.AdminUserName}`);
      setInfo(accountPresent.data.data[0]);
    } catch (error) {
      console.error(error);
    }
  };

  // Check whether the operation is an update or delete
  const checkingPoeration = (operation, id) => {
    if (operation === "update") {
      navigate(`update-admin/${id}`);
    } else if (operation === "delete") {
      navigate(`delete-admin/${id}`);
    }
  };

  return (
    <>
      <div id='container'>
        <div className='search-bar-container'>
          <div id='search-bar'>
            <SearchBar data={setSearchData} />  {/* SearchBar sets the searchData */}
          </div>
          <div id='registration-btn'>
            {info?.AdminRole?.RolePermission?.includes("RegistrationAdmin") && (
              <button onClick={() => { navigate("registration") }}>Admin Registration</button>
            )}
          </div>
        </div>

        {/* Conditional rendering: show searchData if it's available, otherwise show formData */}
        <div id='display-content'>
          {(searchData.length > 0 ? searchData : formData)?.map((admin, index) => (
            <div key={index} id="admin">
              <div id='display-admins-container'>
                <div className='admin-id'>
                  {console.log("admin.AdminId",admin.AdminId)}
                  Id: {admin.AdminId}
                </div>
                <hr />
                <table>
                  <tbody>
                    <tr>
                      <th><div className='admin-info-name'>Name:</div></th>
                      <td>{admin.AdminName}</td>
                    </tr>
                    <tr>
                      <th><div className='admin-info-userName'>User-name:</div></th>
                      <td>{admin.AdminUserName}</td>
                    </tr>
                    <tr>
                      <th><div className='admin-info-phoneNumber'>Phone-number:</div></th>
                      <td>{admin.AdminPhoneNo}</td>
                    </tr>
                    <tr>
                      <th><div className='admin-info-address'>Address:</div></th>
                      <td>{admin.AdminAddress}</td>
                    </tr>
                    <tr>
                      <th><div className='admin-info-permitions'>Permissions:</div></th>
                      <td>
                        <div className="row-group">
                          <div className="dropdown-container">
                            <label>Verification Issues ({admin.verificationIssues?.length || 0} selected)</label>
                            <div className="always-visible-dropdown">
                              {["Unseen Issues", "Accepted Issues", "Rejected Issues", "Reported Issues", "Delete Issues", "Unsolved Issues", "Solved Issues"].map((issue) => (
                                <div key={issue} className="dropdown-item">
                                  <input
                                    type="checkbox"
                                    checked={admin.verificationIssues?.includes(issue === 'Unseen Issues' ? "UnseenProblem" : null || issue === 'Accepted Issues' ? "AcceptProblem" : null || issue === 'Rejected Issues' ? "RejectProblem" : null || issue === 'Reported Issues' ? "ReportProblem" : null || issue === 'Delete Issues' ? "DeleteProblem" : null || issue === 'Unsolved Issues' ? "UnSolvedProblem" : null || issue === 'Solved Issues' ? "SolvedProblem" : null)}
                                    disabled
                                  />
                                  {issue}
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="dropdown-container">
                            <label>Admin Controls ({admin.adminControls?.length || 0} selected)</label>
                            <div className="always-visible-dropdown">
                              {["Admin Registration", "Admin Update", "Admin Delete"].map((control) => (
                                <div key={control} className="dropdown-item">
                                  <input
                                    type="checkbox"
                                    checked={admin.adminControls?.includes( control === 'Admin Registration' ? "RegistrationAdmin" : control === 'Admin Update' ? "UpdateAdmin" : control === 'Admin Delete' ? "DeleteAdmin" : false)}
                                    disabled
                                  />
                                  {control}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div id='operation-container'>
                <div className='operations'>
                  {info?.AdminRole?.RolePermission?.includes("UpdateAdmin") && (
                    <button type="button" className='update-button' onClick={() => checkingPoeration("update", admin.AdminId)}>UPDATE</button>
                  )}
                  <br />
                  {info?.AdminRole?.RolePermission?.includes("DeleteAdmin") && (
                    <button type="button" className='delete-button' onClick={() => checkingPoeration("delete", admin.AdminId)}>DELETE</button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
