import React, { useEffect, useState } from 'react';
import "./css/DisplayIssue.css";
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export const DisplayIssue = () => {

  const [role, setRole] = useState([]);
  const [varifyRole, setVarifyRole] = useState({ issueId: '', role: '' });
  const [issue, setIssue] = useState([]);
  const [buttonDisabledIndex, setButtonDisabledIndex] = useState("");
  const [selectedStatus, setSelectedStatus] = useState('');
  const [radiChecked, setRadiChecked] = useState(false)
  const [radioBtnIndex, setRadioBtnIndex] = useState('')
  const [roleTypeIndex, setRoleTypeIndex] = useState({ Unseen: false, Accepted: false, Rejected: false, Reported: false });
  const [otherPermition, setOtherPermition] = useState({ Delete: false, UnSolved: false, Solved: false })
  const [refresh, setRefresh] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    fetchInfo();
  }, []);

  useEffect(() => {
    if (role.length > 0) {
      fetchIssue();
      setRefresh(false)
      setButtonDisabledIndex("")
    }
  }, [role, roleTypeIndex, otherPermition, refresh]);

  const fetchInfo = async () => {
    try {
      const tokenDecoded = jwtDecode(localStorage.getItem('authorization'));
      const accountPresent = await axios.get(`http://localhost:3001/admin/getAdminByAny/AdminUserName/${tokenDecoded.AdminUserName}`);
      setRole(accountPresent.data.data[0].AdminRole.RolePermission);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchIssue = async () => {
    try {
      const allIssues = [];
      const getIssuePromises = role.map(async (role) => {
        if (roleTypeIndex.Unseen || roleTypeIndex.Accepted || roleTypeIndex.Rejected || roleTypeIndex.Reported || otherPermition.Delete || otherPermition.UnSolved || otherPermition.Solved === true) {
          if (role === "UnseenProblem" && roleTypeIndex.Unseen === true) {
            const getIssue = await axios.get("http://localhost:3001/problem/getProblemById-admin/Status/Unseen");
            allIssues.push(...getIssue.data.data);
          } else if (role === "AcceptProblem" && roleTypeIndex.Accepted === true) {
            const getIssue = await axios.get("http://localhost:3001/problem/getProblemById-admin/Status/Accepted");
            allIssues.push(...getIssue.data.data);
          } else if (role === "RejectProblem" && roleTypeIndex.Rejected === true) {
            const getIssue = await axios.get("http://localhost:3001/problem/getProblemById-admin/Status/Rejected");
            allIssues.push(...getIssue.data.data);
          } else if (role === "ReportProblem" && roleTypeIndex.Reported === true) {
            const getIssue = await axios.get("http://localhost:3001/problem/getProblemById-admin/Status/Reported");
            allIssues.push(...getIssue.data.data);
          }
          else if (role === "DeleteProblem" && otherPermition.Delete === true) {
            let getIssue = await axios.get("http://localhost:3001/problem/getProblemById-admin/Status/Accepted");
            allIssues.push(...getIssue.data.data);
            getIssue = await axios.get("http://localhost:3001/problem/getProblemById-admin/Status/Rejected");
            allIssues.push(...getIssue.data.data);
            getIssue = await axios.get("http://localhost:3001/problem/getProblemById-admin/Status/Reported");
            allIssues.push(...getIssue.data.data);
          } else if (role === "UnSolvedProblem" && otherPermition.UnSolved === true) {
            const getIssue = await axios.get("http://localhost:3001/problem/getProblemById-admin/Status/Accepted");
            const acceptedIssues = getIssue.data.data.filter((problem) =>
              problem.Status.length === 1 && problem.Status[0] === "Accepted"
            );
            allIssues.push(...acceptedIssues)
          } else if (role === "SolvedProblem" && otherPermition.Solved === true) {
            const getIssue = await axios.get("http://localhost:3001/problem/getProblemById-admin/Status/Solved");
            allIssues.push(...getIssue.data.data);
          }
        }
        else {
          if (role === "UnseenProblem" || roleTypeIndex.roleType === "Unseen") {
            const getIssue = await axios.get("http://localhost:3001/problem/getProblemById-admin/Status/Unseen");
            allIssues.push(...getIssue.data.data);
          } else if (role === "AcceptProblem" || roleTypeIndex.roleType === "Accepted") {
            const getIssue = await axios.get("http://localhost:3001/problem/getProblemById-admin/Status/Accepted");
            allIssues.push(...getIssue.data.data);
          } else if (role === "RejectProblem" || roleTypeIndex.roleType === "Rejected") {
            const getIssue = await axios.get("http://localhost:3001/problem/getProblemById-admin/Status/Rejected");
            allIssues.push(...getIssue.data.data);
          } else if (role === "ReportProblem" || roleTypeIndex.roleType === "Reported") {
            const getIssue = await axios.get("http://localhost:3001/problem/getProblemById-admin/Status/Reported");
            allIssues.push(...getIssue.data.data);
          }
        }
      });

      await Promise.all(getIssuePromises);
      const uniqueIssues = allIssues.filter((issue, index, self) =>
        index === self.findIndex((t) => t._id === issue._id)
      );

      setIssue(uniqueIssues);
    } catch (error) {
      console.error("Error fetching issues:", error);
    }
  };

  const getTimeDifference = (uploadTime) => {
    const currentTime = Date.now();
    const uploadTimeMillis = Date.parse(uploadTime);
    const timeDifferenceSeconds = (currentTime - uploadTimeMillis) / 1000;

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

  const rolSelected = async (e) => {
    try {
      if (varifyRole.issueId && varifyRole.role) {
        const data = {
          Status: varifyRole.role,
          UpdateByAdmin: true
        }
        const updateIssue = await axios.put(`http://localhost:3001/problem/updateProblem-admin/${varifyRole.issueId}`, data)
        if (updateIssue.data.data._id != null || undefined || "") {
          setRefresh(true)
          toast(<div style={{ display: "flex", flexDirection: "row" }}>
            <span>✅</span>
            <p style={{ display: "flex", textAlign: "left", marginLeft: "8%" }}>
              Issue verified<br />Status: {varifyRole.role}
            </p>
          </div>, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
        else {
          toast("❌ Not varify, something went wrong.", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
        setVarifyRole({ issueId: '', role: '' });
      }
    } catch (error) {
      console.error("error", error)
    }
  };

  const handleRadioChange = (issueId, e, issueIndex, radioIndex) => {
    const role = e.target.value
    const status = e.target.value

    setSelectedStatus(status)
    setVarifyRole({ issueId, role });
    setRadioBtnIndex(radioIndex)
    if (issueId && role) {
      setButtonDisabledIndex(issueIndex);
    }
    else {
      setButtonDisabledIndex('');
    }
  };

  const handleRoleType = (roleType) => {
    setRoleTypeIndex((prev) => ({ ...prev, [roleType]: !prev[roleType] }));
    if (roleType === "Unseen"||"Accepted"||"Rejected"||"Reported") {
      setOtherPermition(role => ({ ...role, UnSolved: false, Solved: false }))
    }
  }
  const handleOtherPermition = (roleType) => {
    if (roleType === "UnSolved") {
      setOtherPermition(role => ({ ...role, Delete: false, Solved: false }))
      setRoleTypeIndex(role => ({ ...role, Unseen: false, Accepted: false, Rejected: false, Reported: false }))
    }
    else if(roleType === "Solved"){
      setOtherPermition(role => ({ ...role, Delete: false, UnSolved: false }))
      setRoleTypeIndex(role => ({ ...role, Unseen: false, Accepted: false, Rejected: false, Reported: false }))
    }
    else if(roleType === "Delete"){
      setOtherPermition(role => ({ ...role, UnSolved: false, Solved: false }))
    }
    setOtherPermition((prev) => ({ ...prev, [roleType]: !prev[roleType] }));
  }

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
      <div id="roles">
        <h5 style={{ float: "left" }}>Verifying Issues </h5>
        <div id="role-type">
          <h7 style={{ float: "left" }}>Types :</h7>
          {
            role?.map((role, index) => {
              if (role === "UnseenProblem")
                return <button key={index} type="button" className='display-role-button' style={roleTypeIndex.Unseen === true ? { backgroundColor: "black", boxShadow: "none" } : null} onClick={() => handleRoleType("Unseen")} ><h6 className={`display-role ${role}`}>Unseen Issues </h6></button>
              else if (role === "AcceptProblem")
                return <button key={index} type="button" className='display-role-button' style={roleTypeIndex.Accepted === true ? { backgroundColor: "black", boxShadow: "none" } : null} onClick={() => handleRoleType("Accepted")} ><h6 className={`display-role ${role}`}>Accept Issues </h6></button>
              else if (role === "RejectProblem")
                return <button key={index} type="button" className='display-role-button' style={roleTypeIndex.Rejected === true ? { backgroundColor: "black", boxShadow: "none" } : null} onClick={() => handleRoleType("Rejected")} ><h6 className={`display-role ${role}`}>Reject Issues </h6></button>
              else if (role === "ReportProblem")
                return <button key={index} type="button" className='display-role-button' style={roleTypeIndex.Reported === true ? { backgroundColor: "black", boxShadow: "none" } : null} onClick={() => handleRoleType("Reported")} ><h6 className={`display-role ${role}`}>Report Issues </h6></button>
            })
          }
          <button type="button" className='display-role-button button-cancle' style={roleTypeIndex.Unseen || roleTypeIndex.Accepted || roleTypeIndex.Rejected || roleTypeIndex.Reported === true ? null : { display: "none" }} onClick={() => setRoleTypeIndex({ Unseen: false, Accepted: false, Rejected: false, Reported: false })}> <h6 className={`display-role ${role}`}>X </h6></button>
        </div>
        <div id="role-type">
          <h7 style={{ float: "left" }}>Other Permitions :</h7>
          {
            role?.map((role, index) => {
              if (role === "DeleteProblem")
                return <button key={index} type="button" className='other-permitions delete' style={otherPermition.Delete === true ? { backgroundColor: "red", boxShadow: "none" } : null} onClick={() => handleOtherPermition("Delete")} ><h6 className={`display-role ${role}`}>Delete</h6></button>
              else if (role === "UnSolvedProblem") {
                return <button key={index} type="button" className='other-permitions unSolved' style={otherPermition.UnSolved === true ? { backgroundColor: "yellow", boxShadow: "none" } : null} onClick={() => handleOtherPermition("UnSolved")} ><h6 className={`display-role ${role}`}>Unsolved</h6></button>
              }
              else if (role === "SolvedProblem")
                return <button key={index} type="button" className='other-permitions solved' style={otherPermition.Solved === true ? { backgroundColor: "green", boxShadow: "none" } : null} onClick={() => handleOtherPermition("Solved")} ><h6 className={`display-role ${role}`}>Solved</h6></button>
            })
          }
          <button type="button" className='display-role-button button-cancle' style={otherPermition.Delete || otherPermition.Solved || otherPermition.UnSolved === true ? null : { display: "none" }} onClick={() => setOtherPermition({ Delete: false, Solved: false, UnSolved: false })}> <h6 className={`display-role ${role}`}> X </h6></button>
        </div>
        <div style={{ border: "1px solid black", width: "90%" }}></div>
      </div>
      {
        issue.length === 0 ? <h1>Data not found</h1> : issue?.map((issues, index) => {
          return (
            <div key={index} className="display-container">
              <div className="col-md-6 image-container p-3" >
                <img src={issues.ProblemImage} alt="Image" />
              </div>
              <div className="col-md-6">
                <div className="details-container">
                  <div className="details" style={{ border: "none" }}>
                    <div className='admin-id'>
                      Id: {issues._id}
                    </div>
                    <p><strong>Description:</strong> {issues.ProblemDescription} </p>
                    <p><strong>Address:</strong> {issues.ProblemLocation}</p>
                    <p><strong>Location:</strong> Latitude: 40.7128, Longitude: -74.0060</p>
                  </div>
                  <p className="update-ago"><strong>Last Updated:</strong> {getTimeDifference(issues.UploadTime)}</p>
                  <div id='status'>
                    <span>Status :</span>
                    <div id='statusDisplay'>
                      {
                        issues.Status?.map((status, index) => (
                          <span key={index} className={`${status}`}> {status} </span>
                        ))
                      }
                    </div>
                  </div>
                  <div id='varifying-role' >
                    {/* <label style={{ margin: "auto 0%",fontSize:"large" }}>Issue get solved ,you can <span style={{color:"red",fontSize:"large"}}>delete</span></label> */}
                    {otherPermition.Solved === true ? null : <label style={{ margin: "auto 0%" }}>Verifying :</label>}
                    <div id='radio-container'>
                      {
                        role?.map((adminRole, adminIndex) => (
                          issues.Status?.map((issueRole, issueIndex) => {
                            if (adminRole === "UnseenProblem" && issueRole === "Unseen") {
                              return (
                                <div className='radio-data' >
                                  <label for={`Rejected-${index}`} className="RejectProblem radio-label">Reject </label>
                                  <input id={`Accepted-${index}`} type="radio" value="Accepted" checked={buttonDisabledIndex == null || undefined ? false : buttonDisabledIndex === index ? radiChecked : false} onClick={() => setRadiChecked(radiChecked === true ? false : true)} name={selectedStatus - issues._id} onChange={(e) => handleRadioChange(issues._id, e, index, issueIndex)} />
                                  <label for={`Accepted-${index}`} className="AcceptProblem radio-label">Accept </label>
                                  <input id={`Rejected-${index}`} type="radio" value="Rejected" checked={buttonDisabledIndex == null || undefined ? false : buttonDisabledIndex === index ? radiChecked : false} onClick={() => setRadiChecked(radiChecked === true ? false : true)} name={selectedStatus - issues._id} onChange={(e) => handleRadioChange(issues._id, e, index, issueIndex)} />
                                </div>
                              );
                            } else if (adminRole === "ReportProblem" && issueRole === "Reported") {
                              return (
                                <div key={index} className='radio-data'>
                                  <label for={`Unreport-${index}`} className="ReportProblem radio-label">Unreport </label>
                                  <input id={`Unreport-${index}`} type="radio" value="Unreport" checked={buttonDisabledIndex == null || undefined ? false : buttonDisabledIndex === index ? radioBtnIndex === issueIndex ? radiChecked : false : false} onClick={() => setRadiChecked(radiChecked === true ? false : true)} name={selectedStatus - issues._id} onChange={(e) => handleRadioChange(issues._id, e, index, issueIndex)} />
                                </div>
                              );
                            } else if (adminRole === "AcceptProblem" && issueRole === "Accepted") {
                              return (
                                <div key={index} className='radio-data'>
                                  <label for={`Reject-${index}`} className="RejectProblem radio-label">Reject </label>
                                  <input id={`Reject-${index}`} type="radio" value="Rejected" checked={buttonDisabledIndex == null || undefined ? false : buttonDisabledIndex === index ? radioBtnIndex === issueIndex ? radiChecked : false : false} onClick={() => setRadiChecked(radiChecked === true ? false : true)} name={selectedStatus - issues._id} onChange={(e) => handleRadioChange(issues._id, e, index, issueIndex)} />
                                </div>
                              )
                            } else if (adminRole === "RejectProblem" && issueRole === "Rejected") {
                              return (
                                <div className='radio-data'>
                                  <label for={`Accepted-${index}`} className="AcceptProblem radio-label">Accept </label>
                                  <input id={`Accepted-${index}`} type="radio" value="Accepted" checked={buttonDisabledIndex == null || undefined ? false : buttonDisabledIndex === index ? radiChecked : false} onClick={() => setRadiChecked(radiChecked === true ? false : true)} name={selectedStatus - issues._id} onChange={(e) => handleRadioChange(issues._id, e, index, issueIndex)} />
                                </div>
                              );
                            } else if (adminRole === "UnSolvedProblem" && issueRole === "Accepted" && otherPermition.UnSolved === true) {
                              return (
                                <div className='radio-data'>
                                  <label for={`Accepted-${index}`} className="AcceptProblem radio-label">Solved </label>
                                  <input id={`Accepted-${index}`} type="radio" value="Solved" checked={buttonDisabledIndex == null || undefined ? false : buttonDisabledIndex === index ? radiChecked : false} onClick={() => setRadiChecked(radiChecked === true ? false : true)} name={selectedStatus - issues._id} onChange={(e) => handleRadioChange(issues._id, e, index, issueIndex)} />
                                </div>
                              );
                            }
                            else if (adminRole === "SolvedProblem" && issueRole === "Solved" && otherPermition.Solved === true) {
                              return (
                                <label style={{ margin: "auto 0%", fontSize: "large" }}>Issue get solved ,you can <span style={{ color: "red", fontSize: "large" }}>delete</span></label>
                                // <div className='radio-data'>
                                //   <label for={`Accepted-${index}`} className="AcceptProblem radio-label">Solved </label>
                                //   <input id={`Accepted-${index}`} type="radio" value="Solved" checked={buttonDisabledIndex == null || undefined ? false : buttonDisabledIndex === index ? radiChecked : false} onClick={() => setRadiChecked(radiChecked === true ? false : true)} name={selectedStatus - issues._id} onChange={(e) => handleRadioChange(issues._id, e, index, issueIndex)} />
                                // </div>
                              );
                            }
                          })
                        ))
                      }
                    </div>
                    {
                      issues.Status.length === 1 && issues.Status.includes("Solved") ?
                        <button id='issue-delete-btn' type="button" onClick={() => { navigate(`delete-issue/${issues._id}`) }}>DELETE</button> : <button id='submit-role' type="button" onClick={rolSelected} disabled={radiChecked === true ? buttonDisabledIndex == null || undefined ? true : buttonDisabledIndex === index ? false : true : true}>Verify</button>
                    }
                    {
                      role.includes("DeleteProblem") && otherPermition.Delete === true ? (
                        issues.Status.includes("Accepted") || issues.Status.includes("Rejected") || issues.Status.includes("Reported") ?
                          <button id='issue-delete-btn' type="button" onClick={() => { navigate(`delete-issue/${issues._id}`) }}>DELETE</button> : null
                      ) : null
                    }
                  </div>
                </div>
              </div>
            </div>
          );
        })
      }
    </>
  );
};



// && (roleTypeIndex.Unseen || roleTypeIndex.Accepted || roleTypeIndex.Rejected || roleTypeIndex.Reported || otherPermition.Delete || otherPermition.Solved === false)