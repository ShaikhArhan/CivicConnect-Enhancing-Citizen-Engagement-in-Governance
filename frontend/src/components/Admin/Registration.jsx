// import React, { useState } from 'react';
// import "./css/Registration.css";
// import { toast, ToastContainer } from 'react-toastify';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// export const Registration = () => {

//   const [formData, setFormData] = useState({
//     name: '',
//     username: '',
//     password: '',
//     phoneNumber: '',
//     address: '',
//     verificationIssues: [],
//     adminControls: [],
//     roleId: ''
//   });

//   const navigate = useNavigate()

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const toggleSelection = (field, e) => {
//     const value = e.target.value;
//     // console.log("Toggle Selection for:", value);

//     setFormData((prevData) => {
//       const selectedValues = prevData[field];
//       if (selectedValues.includes(value)) {
//         // console.log("Removing:", value);
//         return {
//           ...prevData,
//           [field]: selectedValues.filter((v) => v !== value),
//         };
//       } else {
//         // console.log("Adding:", value);
//         return {
//           ...prevData,
//           [field]: [...selectedValues, value],
//         };
//       }
//     });
//   };


//   const handleClear = (field) => {
//     setFormData({ ...formData, [field]: [] });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       if (formData.verificationIssues.length === 0 && formData.adminControls.length === 0) {
//         toast(
//           <div style={{ display: "flex" }}>
//             <span style={{ color: "red", marginRight: "1%", fontSize: "18px" }}>!!</span>
//             Please select at least one
//             <p style={{ color: "black", marginLeft: "1%" }}>Permission</p>
//           </div>, {
//           position: "top-right",
//           autoClose: 4000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//           theme: "light",
//         });
//         return;
//       }
//       else {
//         let permission = [];
//         if (formData.verificationIssues.length > 0) {
//           permission = [...formData.verificationIssues, "varifyProblem"].flat()
//         }
//         if (formData.adminControls.length > 0) {
//           permission = [...permission, ...formData.adminControls, "adminControll"].flat()
//         }
//         // console.log("permission Array:", permission);
//         const rolRresponse = await axios.post("http://localhost:3001/role/addRole", { RolePermission: permission })
//         formData.roleId = rolRresponse.data.data._id
//         // console.log("formData.roleId", formData);
//         const adminRresponse = await axios.post("http://localhost:3001/admin/addAdmin", formData)
//         // console.log("adminRresponse", adminRresponse);

//         if (adminRresponse.data.message == "Please use different 'Phone Number' or 'Username' or 'Password'") {
//           toast("❌ Please use different 'Phone Number' or 'Username' or 'Password'", {
//             position: "top-right",
//             autoClose: 3000,
//             hideProgressBar: false,
//             closeOnClick: true,
//             pauseOnHover: true,
//             draggable: true,
//             progress: undefined,
//             theme: "light",
//             style: {
//               width: "max-content", // Adjust the width as needed
//               float: "right",
//               padding: "0% 2%"
//             },
//           });
//         }
//         else if (rolRresponse != "" || null || undefined && adminRresponse != "" || null || undefined) {
//           const roleUpdateResponse = axios.put(`http://localhost:3001/role/updateRole/${rolRresponse.data.data._id}`, { RoleName: adminRresponse.data.data._id })
//           if (roleUpdateResponse != "" || null || undefined) {
//             toast('🔐 Registration successful', {
//               position: "top-right",
//               autoClose: 3000,
//               hideProgressBar: false,
//               closeOnClick: true,
//               pauseOnHover: true,
//               draggable: true,
//               progress: undefined,
//               theme: "light",
//             });

//             setTimeout(() => {
//               navigate("/admin/admin-controll");
//             }, 3000);
//           }
//         }
//         else {
//           toast("⚠️ Something went wrong", {
//             position: "top-right",
//             autoClose: 3000,
//             hideProgressBar: false,
//             closeOnClick: true,
//             pauseOnHover: true,
//             draggable: true,
//             progress: undefined,
//             theme: "light",
//             toastStyle: {
//               whiteSpace: "normal",
//             },
//           });
//         }
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <>
//       <ToastContainer
//         position="top-right"
//         autoClose={2500}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme="light"
//       />
//       <form onSubmit={handleSubmit} className="registration-form">
//       <h1>Admin Registration</h1>
//         <div className="form-group">
//           <label>Name:</label>
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label>Username:</label>
//           <input
//             type="text"
//             name="username"
//             value={formData.username}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label>Password:</label>
//           <input
//             type="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label>Phone Number:</label>
//           <input
//             type="tel"
//             name="phoneNumber"
//             value={formData.phoneNumber}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label>Address:</label>
//           <input
//             type="text"
//             name="address"
//             value={formData.address}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         {/* Dropdown with Checkboxes */}
//         <div className="form-group">
//           <label>Permission:</label>
//           <div className="dropdown-container">
//             <div className="dropdown">
//               <button
//                 type="button"
//                 className="dropdown-button"
//                 aria-expanded={formData.verificationIssues.length > 0}
//               >
//                 Issues Verification
//               </button>
//               <div className="dropdown-menu">
//                 {['Unseen Issues', 'Accepted Issues', 'Rejected Issues', 'Reported Issues', 'Delete Issues', 'Unsolved Issues', 'Solved Issues'].map((issue, index) => (
//                   <label key={index} className="dropdown-item">
//                     <input
//                       type="checkbox"
//                       value={issue === 'Unseen Issues' ? "UnseenProblem" : issue === 'Accepted Issues' ? "AcceptProblem" : issue === 'Rejected Issues' ? "RejectProblem" : issue === 'Reported Issues' ? "ReportProblem" : issue === 'Delete Issues' ? "DeleteProblem" : issue === 'Unsolved Issues' ? "UnSolvedProblem" : issue === 'Solved Issues' ? "SolvedProblem" : null}
//                       checked={formData.verificationIssues.includes(issue === 'Unseen Issues' ? "UnseenProblem" : issue === 'Accepted Issues' ? "AcceptProblem" : issue === 'Rejected Issues' ? "RejectProblem" : issue === 'Reported Issues' ? "ReportProblem" : issue === 'Delete Issues' ? "DeleteProblem" : issue === 'Unsolved Issues' ? "UnSolvedProblem" : issue === 'Solved Issues' ? "SolvedProblem" : console.log("no checked role"))}
//                       onChange={(e) => toggleSelection('verificationIssues', e)}
//                     />
//                     {issue}
//                   </label>
//                 ))}
//               </div>
//             </div>
//             <button
//               type="button"
//               className="clear-button"
//               onClick={() => handleClear('verificationIssues')}
//               style={{ display: formData.verificationIssues.length > 0 ? 'inline-block' : 'none' }}
//             >
//               Clear
//             </button>
//           </div>

//           <div className="dropdown-container">
//             <div className="dropdown">
//               <button
//                 type="button"
//                 className="dropdown-button"
//                 aria-expanded={formData.adminControls.length > 0}
//               >
//                 Admin Control
//               </button>
//               <div className="dropdown-menu">
//                 {['Admin Registration', 'Admin Update', 'Admin Delete'].map((control, index) => (
//                   <label key={index} className="dropdown-item">
//                     <input
//                       type="checkbox"
//                       value={ control === 'Admin Registration' ? "RegistrationAdmin" : control === 'Admin Update' ? "UpdateAdmin" : control === 'Admin Delete' ? "DeleteAdmin" : null}
//                       checked={formData.adminControls.includes( control === 'Admin Registration' ? "RegistrationAdmin" : control === 'Admin Update' ? "UpdateAdmin" : control === 'Admin Delete' ? "DeleteAdmin" : console.log("no checked role"))}
//                       onChange={(e) => toggleSelection('adminControls', e)}
//                     />
//                     {control}
//                   </label>
//                 ))}
//               </div>
//             </div>
//             <button
//               type="button"
//               className="clear-button"
//               onClick={() => handleClear('adminControls')}
//               style={{ display: formData.adminControls.length > 0 ? 'inline-block' : 'none' }}
//             >
//               Clear
//             </button>
//           </div>
//         </div>

//         <button type="submit" className="submit-button">Register</button>
//       </form>
//     </>
//   );
// };




//imp imp imp imp imp imp imp imp imp imp imp imp imp imp imp imp imp imp imp


import React, { useState } from 'react';
import "./css/Registration.css";
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const Registration = () => {

  const [formData, setFormData] = useState({
    name: '',
    username: '',
    password: '',
    phoneNumber: '',
    address: '',
    verificationIssues: [],
    adminControls: [],
    roleId: ''
  });

  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const toggleSelection = (field, e) => {
    const value = e.target.value;
    // console.log("Toggle Selection for:", value);

    setFormData((prevData) => {
      const selectedValues = prevData[field];
      if (selectedValues.includes(value)) {
        // console.log("Removing:", value);
        return {
          ...prevData,
          [field]: selectedValues.filter((v) => v !== value),
        };
      } else {
        // console.log("Adding:", value);
        return {
          ...prevData,
          [field]: [...selectedValues, value],
        };
      }
    });
  };


  const handleClear = (field) => {
    setFormData({ ...formData, [field]: [] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (formData.verificationIssues.length === 0 && formData.adminControls.length === 0) {
        toast(
          <div style={{ display: "flex" }}>
            <span style={{ color: "red", marginRight: "1%", fontSize: "18px" }}>!!</span>
            Please select at least one
            <p style={{ color: "black", marginLeft: "1%" }}>Permission</p>
          </div>, {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        return;
      }
      else {
        let permission = [];
        if (formData.verificationIssues.length > 0) {
          permission = [...formData.verificationIssues, "varifyProblem"].flat()
        }
        if (formData.adminControls.length > 0) {
          permission = [...permission, ...formData.adminControls, "adminControll"].flat()
        }
        // console.log("permission Array:", permission);
        const rolRresponse = await axios.post("http://localhost:3001/role/addRole", { RolePermission: permission })
        formData.roleId = rolRresponse.data.data._id
        // console.log("formData.roleId", formData);
        const adminRresponse = await axios.post("http://localhost:3001/admin/addAdmin", formData)
        // console.log("adminRresponse", adminRresponse);

        if (adminRresponse.data.message == "Please use different 'Phone Number' or 'Username' or 'Password'") {
          toast("❌ Please use different 'Phone Number' or 'Username' or 'Password'", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            style: {
              width: "max-content", // Adjust the width as needed
              float: "right",
              padding: "0% 2%"
            },
          });
        }
        else if (rolRresponse != "" || null || undefined && adminRresponse != "" || null || undefined) {
          const roleUpdateResponse = axios.put(`http://localhost:3001/role/updateRole/${rolRresponse.data.data._id}`, { RoleName: adminRresponse.data.data._id })
          if (roleUpdateResponse != "" || null || undefined) {
            toast('🔐 Registration successful', {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });

            setTimeout(() => {
              navigate("/admin/admin-controll");
            }, 3000);
          }
        }
        else {
          toast("⚠️ Something went wrong", {
            position: "top-right",
            autoClose: 3000,
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
    } catch (error) {
      console.error(error);
    }
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
      <form onSubmit={handleSubmit} className="registration-form">
      <h1>Admin Registration</h1>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Phone Number:</label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        {/* Dropdown with Checkboxes */}
        <div className="form-group">
          <label>Permission:</label>
          <div className="dropdown-container">
            <div className="dropdown">
              <button
                type="button"
                className="dropdown-button"
                aria-expanded={formData.verificationIssues.length > 0}
              >
                Issues Verification
              </button>
              <div className="dropdown-menu">
                {['Unseen Issues', 'Accepted Issues', 'Rejected Issues', 'Reported Issues', 'Delete Issues', 'Unsolved Issues', 'Solved Issues'].map((issue, index) => (
                  <label key={index} className="dropdown-item">
                    <input
                      type="checkbox"
                      value={issue === 'Unseen Issues' ? "UnseenProblem" : issue === 'Accepted Issues' ? "AcceptProblem" : issue === 'Rejected Issues' ? "RejectProblem" : issue === 'Reported Issues' ? "ReportProblem" : issue === 'Delete Issues' ? "DeleteProblem" : issue === 'Unsolved Issues' ? "UnSolvedProblem" : issue === 'Solved Issues' ? "SolvedProblem" : null}
                      checked={formData.verificationIssues.includes(issue === 'Unseen Issues' ? "UnseenProblem" : issue === 'Accepted Issues' ? "AcceptProblem" : issue === 'Rejected Issues' ? "RejectProblem" : issue === 'Reported Issues' ? "ReportProblem" : issue === 'Delete Issues' ? "DeleteProblem" : issue === 'Unsolved Issues' ? "UnSolvedProblem" : issue === 'Solved Issues' ? "SolvedProblem" : console.log("no checked role"))}
                      onChange={(e) => toggleSelection('verificationIssues', e)}
                    />
                    {issue}
                  </label>
                ))}
              </div>
            </div>
            <button
              type="button"
              className="clear-button"
              onClick={() => handleClear('verificationIssues')}
              style={{ display: formData.verificationIssues.length > 0 ? 'inline-block' : 'none' }}
            >
              Clear
            </button>
          </div>

          <div className="dropdown-container">
            <div className="dropdown">
              <button
                type="button"
                className="dropdown-button"
                aria-expanded={formData.adminControls.length > 0}
              >
                Admin Control
              </button>
              <div className="dropdown-menu">
                {['Admin Registration', 'Admin Update', 'Admin Delete'].map((control, index) => (
                  <label key={index} className="dropdown-item">
                    <input
                      type="checkbox"
                      value={ control === 'Admin Registration' ? "RegistrationAdmin" : control === 'Admin Update' ? "UpdateAdmin" : control === 'Admin Delete' ? "DeleteAdmin" : null}
                      checked={formData.adminControls.includes( control === 'Admin Registration' ? "RegistrationAdmin" : control === 'Admin Update' ? "UpdateAdmin" : control === 'Admin Delete' ? "DeleteAdmin" : console.log("no checked role"))}
                      onChange={(e) => toggleSelection('adminControls', e)}
                    />
                    {control}
                  </label>
                ))}
              </div>
            </div>
            <button
              type="button"
              className="clear-button"
              onClick={() => handleClear('adminControls')}
              style={{ display: formData.adminControls.length > 0 ? 'inline-block' : 'none' }}
            >
              Clear
            </button>
          </div>
        </div>

        <button type="submit" className="submit-button">Register</button>
      </form>
    </>
  );
};
