import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import "./css/DeleteAdmin.css";
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

export const DeleteAdmin = () => {
  const { adminId } = useParams()
  const navigate = useNavigate()

  const textareaRefs = {
    AdminRole: useRef(null),
    AdminName: useRef(null),
    AdminPhoneNo: useRef(null),
    AdminUserName: useRef(null),
    AdminPassword: useRef(null),
    AdminAddress: useRef(null),
    AdminRolePermission: useRef(null)
  };

  const [formData, setFormData] = useState({
    AdminRole: '',
    AdminName: '',
    AdminPhoneNo: '',
    AdminUserName: '',
    AdminPassword: '',
    AdminAddress: '',
    AdminRolePermission: '',
    verificationIssues: [], // Initialize as an empty array
    adminControls: [] // Initialize as an empty array
  });

  const [loading, setLoading] = useState(true);
  const [deleteConform, setDeleteConform] = useState("")

  // Adjusts the textarea height based on content
  const adjustTextareaHeight = (textarea) => {
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  useEffect(() => {
    // Adjust heights of all textareas when data is loaded
    for (const ref in textareaRefs) {
      adjustTextareaHeight(textareaRefs[ref].current);
    }
  }, [formData, textareaRefs]);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const adminResponse = await axios.get(`http://localhost:3001/admin/getAdminByAny/_id/${adminId}`);
        console.log("adminResponse", adminResponse.data.data[0].AdminRole.RolePermission);

        const adminData = adminResponse.data.data[0];

        setFormData({
          AdminId: adminData._id,
          AdminRole: adminData.AdminRole,
          AdminName: adminData.AdminName,
          AdminPhoneNo: adminData.AdminPhoneNo,
          AdminUserName: adminData.AdminUserName,
          AdminPassword: adminData.AdminPassword,
          AdminAddress: adminData.AdminAddress,
          AdminRolePermission: adminData.AdminRole.RolePermission,
          verificationIssues: adminData.AdminRole.RolePermission.filter(role => role === "AcceptProblem" || role === "RejectProblem" || role === "UnseenProblem" || role === "ReportProblem" || role === "DeleteProblem" || role === "UnSolvedProblem" || role === "SolvedProblem"),
          adminControls: adminData.AdminRole.RolePermission.filter(role => role === "RegistrationAdmin" || role === "UpdateAdmin" || role === "DeleteAdmin")
        });
        setLoading(false);
      } catch (error) {
        console.error('There was an error fetching the admin data!');
        setLoading(false);
      }
    };
    fetchAdminData();
  }, [adminId]);

  const handleSubmit = async (e) => {

    e.preventDefault();
    try {
      if (deleteConform === "DELETE") {
        const deleteResponse = await axios.delete(`http://localhost:3001/admin/deleteAdmin/${formData.AdminId}`)
        console.log("deleteResponse", deleteResponse);

        if (deleteResponse && deleteResponse != "" || undefined || null) {
          toast(`✅ ${deleteResponse.data.message}`, {
            position: "top-right",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            toastStyle: {
              whiteSpace: "normal",
            },
          });
          setDeleteConform("")
          setTimeout(() => {
            navigate("/admin/admin-controll");
          }, 2600);
        }
        else if (deleteResponse.data.success === false) {
          toast(`⚠️ ${deleteResponse.data.message}`, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            toastStyle: {
              whiteSpace: "normal",
            },
          });
        }
      } else if (deleteConform != "DELETE") {
        setDeleteConform("")
        toast('🚫 Write "DELETE" in Conformation', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          toastStyle: {
            whiteSpace: "normal",
          },
        });
      }
    } catch (error) {
      console.error('There was an error deleting the admin!');
      toast(<div><span style={{ color: "red" }}>Error,</span> Something Went Wrong <span style={{ color: "red" }}>!!</span></div>, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        toastStyle: {
          whiteSpace: "normal",
        },
      });
    }
  }
  if (loading) return <p>Loading...</p>;

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
      <br /><br /><br />
      <div className="form-container">
        <h2>Delete Admin</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name :</label>
            <textarea
              name="AdminName"
              rows="1"
              ref={textareaRefs.AdminName}
              value={formData.AdminName}
              disabled
            ></textarea>
          </div>
          <div className="form-group">
            <label>Username :</label>
            <textarea
              name="AdminUserName"
              rows="1"
              ref={textareaRefs.AdminUserName}
              value={formData.AdminUserName}
              disabled
            ></textarea>
          </div>
          <div className="form-group">
            <label>Password :</label>
            <textarea
              name="AdminPassword"
              rows="1"
              ref={textareaRefs.AdminPassword}
              value={formData.AdminPassword.replace(/./g, '*')}              
              disabled
            ></textarea>
          </div>
          <div className="form-group">
            <label>Phone No :</label>
            <textarea
              name="AdminPhoneNo"
              rows="1"
              ref={textareaRefs.AdminPhoneNo}
              value={formData.AdminPhoneNo}
              disabled
            ></textarea>
          </div>
          <div className="form-group">
            <label>Address :</label>
            <textarea
              name="AdminAddress"
              rows="1"
              ref={textareaRefs.AdminAddress}
              value={formData.AdminAddress}
              disabled
            ></textarea>
          </div>
          <label>Permission :</label>
          <div className="row-group">
            <div className="delete-dropdown-container">
              <label>Verification Issues ({formData.verificationIssues.length} selected)</label>
              <div className="always-visible-dropdown">
                {["Unseen Issues", "Accepted Issues", "Rejected Issues", "Reported Issues", "Delete Issues", "Unsolved Issues", "Solved Issues"].map((issue) => (
                  <div key={issue} className="dropdown-item">
                    <input
                      type="checkbox"
                      value={issue === 'Unseen Issues' ? "UnseenProblem" : issue === 'Accepted Issues' ? "AcceptProblem" : issue === 'Rejected Issues' ? "RejectProblem" : issue === 'Reported Issues' ? "ReportProblem" : issue === 'Delete Issues' ? "DeleteProblem" : issue === 'Unsolved Issues' ? "UnSolvedProblem" : issue === 'Solved Issues' ? "SolvedProblem" : null}
                      checked={formData.verificationIssues.includes(issue === 'Unseen Issues' ? "UnseenProblem" : null || issue === 'Accepted Issues' ? "AcceptProblem" : null || issue === 'Rejected Issues' ? "RejectProblem" : null || issue === 'Reported Issues' ? "ReportProblem" : null || issue === 'Delete Issues' ? "DeleteProblem" : null || issue === 'Unsolved Issues' ? "UnSolvedProblem" : null || issue === 'Solved Issues' ? "SolvedProblem" : null)}
                      // checked={formData.verificationIssues.includes(issue)}
                      onChange={() => {
                        const newVerificationIssues = formData.verificationIssues.includes(issue)
                          ? formData.verificationIssues.filter(i => i !== issue)
                          : [...formData.verificationIssues, issue];
                        setFormData((prevState) => ({
                          ...prevState,
                          verificationIssues: newVerificationIssues
                        }));
                      }}
                      disabled
                    />
                    {issue}
                  </div>
                ))}
              </div>
            </div>
            <div className="delete-dropdown-container">
              <label>Admin Controls ({formData.adminControls.length} selected)</label>
              <div className="always-visible-dropdown">
                {["Admin Registration", "Admin Update", "Admin Delete"].map((control) => (
                  <div key={control} className="dropdown-item">
                    <input
                      type="checkbox"
                      value={ control === 'Admin Registration' ? "RegistrationAdmin" : control === 'Admin Update' ? "UpdateAdmin" : control === 'Admin Delete' ? "DeleteAdmin" : null}
                      checked={formData.adminControls.includes( control === 'Admin Registration' ? "RegistrationAdmin" : control === 'Admin Update' ? "UpdateAdmin" : control === 'Admin Delete' ? "DeleteAdmin" : false)}
                      onChange={() => {
                        const newAdminControls = formData.adminControls.includes(control)
                          ? formData.adminControls.filter(c => c !== control)
                          : [...formData.adminControls, control];
                        setFormData((prevState) => ({
                          ...prevState,
                          adminControls: newAdminControls
                        }));
                      }}
                      disabled
                    />
                    {control}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="form-group">
            <label>Type "DELETE" to confirm:</label>
            <input style={{ width: "50%" }} type="text" placeholder='DELETE' value={deleteConform} onChange={(e) => { setDeleteConform(e.target.value) }} />
          </div>
          <button type="submit" className="submit-btn">Delete</button>
        </form>
      </div>
    </>
  )
}
