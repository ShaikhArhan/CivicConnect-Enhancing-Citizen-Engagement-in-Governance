import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import "./css/Update.css";
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

export const UpdateAdmin = () => {
    const { adminId } = useParams()
    const navigate = useNavigate()

    const textareaRefs = {
        AdminRole: useRef(null),
        AdminName: useRef(null),
        AdminPhoneNo: useRef(null),
        AdminUserName: useRef(null),
        AdminPassword: useRef(null),
        AdminAddress: useRef(null)
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

    const [formDataSubmit, setFormDataSubmit] = useState({
        AdminRole: '',
        AdminName: '',
        AdminPhoneNo: '',
        AdminUserName: '',
        AdminPassword: '',
        AdminAddress: '',
        AdminRolePermission: [],
        verificationIssues: [], // Initialize as an empty array
        adminControls: [] // Initialize as an empty array
    });


    const [loading, setLoading] = useState(true);
    const [colorChange, setColorChange] = useState({ verificationIssues: [], adminControls: [] })

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
                // const roleData = roleResponse

                setFormData({
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
                setFormDataSubmit({
                    AdminRole: adminData.AdminRole,
                    AdminName: adminData.AdminName,
                    AdminPhoneNo: adminData.AdminPhoneNo,
                    AdminUserName: adminData.AdminUserName,
                    AdminPassword: adminData.AdminPassword,
                    AdminAddress: adminData.AdminAddress,
                    AdminRolePermission: adminData.AdminRole.RolePermission,
                    verificationIssues: adminData.AdminRole.RolePermission.filter(role => role === "AcceptProblem" || role === "RejectProblem" || role === "UnseenProblem" || role === "ReportProblem" || role === "DeleteProblem" || role === "UnSolvedProblem" || role === "SolvedProblem"),
                    adminControls: adminData.AdminRole.RolePermission.filter(role => role === role === "RegistrationAdmin" || role === "UpdateAdmin" || role === "DeleteAdmin"),
                })
                setLoading(false);
            } catch (error) {
                console.error('There was an error fetching the admin data!');
                setLoading(false);
            }
        };
        fetchAdminData();
    }, [adminId]);

    const handleChange = (e) => {
        setFormDataSubmit({
            ...formDataSubmit,
            [e.target.name]: e.target.value,
        });
        adjustTextareaHeight(textareaRefs[e.target.name].current);
    };

    const handleSubmit = async (e) => {

        e.preventDefault();
        console.log("formData", formData);
        try {
            setFormDataSubmit({
                AdminRole: formDataSubmit.AdminRole || formData.AdminRole,
                AdminName: formDataSubmit.AdminName || formData.AdminName,
                AdminPhoneNo: formDataSubmit.AdminPhoneNo || formData.AdminPhoneNo,
                AdminUserName: formDataSubmit.AdminUserName || formData.AdminUserName,
                AdminPassword: formDataSubmit.AdminPassword || formData.AdminPassword,
                AdminAddress: formDataSubmit.AdminAddress || formData.AdminAddress,
                AdminRolePermission: formDataSubmit.AdminRolePermission || formData.AdminRolePermission,
                verificationIssues: formDataSubmit.verificationIssues || formData.verificationIssues,
                adminControls: formDataSubmit.adminControls || formData.adminControls
            })
            console.log("formDataSubmit", formDataSubmit);


            console.log("formDataSubmit.AdminRole._id", formDataSubmit.AdminRole._id);

            const adminResponse = await axios.put(`http://localhost:3001/admin/updateAdmin/${adminId}`, formDataSubmit);
            console.log('adminResponse-', adminResponse);
            if (adminResponse.data.success === true) {
                let permission = [];
                if (formDataSubmit.verificationIssues.length > 0) {
                    permission = [...formDataSubmit.verificationIssues, "varifyProblem"].flat()
                }
                if (formDataSubmit.adminControls.length > 0) {
                    permission = [...permission, ...formDataSubmit.adminControls, "adminControll"].flat()
                }

                const roleResponse = await axios.put(`http://localhost:3001/role/updateRole/${formDataSubmit.AdminRole._id}`, { RolePermission: permission })
                console.log("roleResponse-", roleResponse);
                if (adminResponse.data.success === true && roleResponse.data.success === true) {
                    toast(`✅ ${adminResponse.data.message}`, {
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
                    setTimeout(() => {
                        navigate("/admin/admin-controll");
                    }, 3000);
                }
                else if (adminResponse.data.success === true && (roleResponse.data.status === 500 || roleResponse.data.data === "" || null || undefined)) {
                    const adminResponse = await axios.put(`http://localhost:3001/admin/updateAdmin/${adminId}`, formData);

                    toast("⏳ Only Admin Updated ,✖️ Permissions not updated.Try again !!", {
                        position: "top-right",
                        autoClose: 4000,
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
            else if (adminResponse.data.success === false) {
                toast(`⚠️ ${adminResponse.data.message}`, {
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
            else {
                const adminResponse = await axios.put(`http://localhost:3001/admin/updateAdmin/${adminId}`, formData);
                toast("🚫 Something Went Wrong", {
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
            const adminResponse = await axios.put(`http://localhost:3001/admin/updateAdmin/${adminId}`, formData);
            console.error('There was an error updating the admin!');
            toast("🚫 Error updating the admin!", {
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
    };

    if (loading) return <p>Loading...</p>;

    const handleClear = (field) => {
        setFormData({ ...formData, [field]: [] });
        setFormDataSubmit({ ...formDataSubmit, [field]: [] });
    };

    const toggleSelection = (field, e, index) => {
        const value = e.target.value;

        setFormDataSubmit((prevData) => {
            const selectedValues = prevData[field];
            let newSelectedValues;

            if (selectedValues.includes(value)) {
                // Remove the selected value
                newSelectedValues = selectedValues.filter((v) => v !== value);
            } else {
                // Add the selected value
                newSelectedValues = [...selectedValues, value];
            }

            return {
                ...prevData,
                [field]: newSelectedValues,
            };
        });
        // Update colors
        dropdownColorChange(field, value, index)
    };

    const dropdownColorChange = (field, value, index) => {
        setColorChange((prevColors) => {
            const isModified = !formDataSubmit[field].includes(value);
            // console.log("isModified", isModified);
            // console.log("isModified", formDataSubmit[field]);

            const updatedColors = [...prevColors[field]];
            updatedColors[index] = isModified ? "green" : "red";
            return { ...prevColors, [field]: updatedColors };
        });
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
            <br /><br /><br />
            <div className="form-container">
                <h2>Update Admin</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Name :</label>
                        <textarea style={{ color: formData.AdminName === formDataSubmit.AdminName ? "green" : "red" }}
                            name="AdminName"
                            rows="1"
                            ref={textareaRefs.AdminName}
                            // value={formData.AdminName}
                            placeholder={formData.AdminName}
                            onChange={handleChange}
                        ></textarea>
                    </div>
                    <div className="form-group">
                        <label>Username :</label>
                        <textarea style={{ color: formData.AdminUserName === formDataSubmit.AdminUserName ? "green" : "red" }}
                            name="AdminUserName"
                            rows="1"
                            ref={textareaRefs.AdminUserName}
                            // value={formData.AdminUserName}
                            placeholder={formData.AdminUserName}
                            onChange={handleChange}
                        ></textarea>
                    </div>
                    <div className="form-group">
                        <label>Password :</label>
                        <textarea style={{ color: formData.AdminPassword === formDataSubmit.AdminPassword ? "green" : "red" }}
                            name="AdminPassword"
                            rows="1"
                            ref={textareaRefs.AdminPassword}
                            // value={formData.AdminPassword}
                            placeholder={formData.AdminPassword.replace(/./g, '*')}
                            onChange={handleChange}
                        ></textarea>
                    </div>
                    <div className="form-group">
                        <label>Phone No :</label>
                        <textarea style={{ color: formData.AdminPhoneNo === formDataSubmit.AdminPhoneNo ? "green" : "red" }}
                            name="AdminPhoneNo"
                            rows="1"
                            ref={textareaRefs.AdminPhoneNo}
                            // value={formData.AdminPhoneNo}
                            placeholder={formData.AdminPhoneNo}
                            onChange={handleChange}
                        ></textarea>
                    </div>
                    <div className="form-group">
                        <label>Address :</label>
                        <textarea style={{ color: formData.AdminAddress === formDataSubmit.AdminAddress ? "green" : "red" }}
                            name="AdminAddress"
                            rows="1"
                            ref={textareaRefs.AdminAddress}
                            // value={formData.AdminAddress}
                            placeholder={formData.AdminAddress}
                            onChange={handleChange}
                        ></textarea>
                    </div>
                    {/* Dropdown with Checkboxes */}
                    <div className="form-group">
                        <label>Permission:</label>
                        <div className="dropdown-container">
                            <div className="dropdown">
                                <button
                                    type="button"
                                    className="dropdown-button"
                                    aria-expanded={formDataSubmit.verificationIssues.length > 0}
                                >
                                    Issues Verification
                                </button>
                                <div className="dropdown-menu">
                                    {['Unseen Issues', 'Accepted Issues', 'Rejected Issues', 'Reported Issues', 'Delete Issues', 'Unsolved Issues', 'Solved Issues'].map((issue, index) => (
                                        <label key={index} className="dropdown-item" style={{ color: colorChange.verificationIssues[index] }}>
                                            <input
                                                type="checkbox"
                                                value={issue === 'Unseen Issues' ? "UnseenProblem" : issue === 'Accepted Issues' ? "AcceptProblem" : issue === 'Rejected Issues' ? "RejectProblem" : issue === 'Reported Issues' ? "ReportProblem" : issue === 'Delete Issues' ? "DeleteProblem" : issue === 'Unsolved Issues' ? "UnSolvedProblem" : issue === 'Solved Issues' ? "SolvedProblem" : null}
                                                checked={formDataSubmit.verificationIssues.includes(issue === 'Unseen Issues' ? "UnseenProblem" : null || issue === 'Accepted Issues' ? "AcceptProblem" : null || issue === 'Rejected Issues' ? "RejectProblem" : null || issue === 'Reported Issues' ? "ReportProblem" : null || issue === 'Delete Issues' ? "DeleteProblem" : null || issue === 'Unsolved Issues' ? "UnSolvedProblem" : null || issue === 'Solved Issues' ? "SolvedProblem" : null)}
                                                onChange={(e) => toggleSelection('verificationIssues', e, index)}
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
                                style={{ display: formDataSubmit.verificationIssues.length > 0 ? 'inline-block' : 'none' }}
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
                                        <label key={index} className="dropdown-item" style={{ color: colorChange.adminControls[index] }}>
                                            <input
                                                type="checkbox"
                                                value={control === 'Admin Registration' ? "RegistrationAdmin" : control === 'Admin Update' ? "UpdateAdmin" : control === 'Admin Delete' ? "DeleteAdmin" : null}
                                                checked={formDataSubmit.adminControls.includes(control === 'Admin Registration' ? "RegistrationAdmin" : control === 'Admin Update' ? "UpdateAdmin" : control === 'Admin Delete' ? "DeleteAdmin" : false)}
                                                onChange={(e) => toggleSelection('adminControls', e, index)}
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
                                style={{ display: formDataSubmit.adminControls.length > 0 ? 'inline-block' : 'none' }}
                            >
                                Clear
                            </button>
                        </div>
                    </div>
                    <button type="submit" className="submit-btn">Update Admin</button>
                </form>
            </div>
        </>
    );
};
