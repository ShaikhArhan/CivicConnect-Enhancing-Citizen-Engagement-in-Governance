const problemModel = require('../models/ProblemModel');
const multer = require('multer');
const fs = require('fs');
const cloudinary = require('cloudinary').v2;

require('dotenv').config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
const storage = multer.diskStorage({
    destination: './uploads/',
});
const upload = multer({
    storage: storage
    // limits: { fileSize: 2000000 }, //infile size 1mb
}).single("ProblemImage");




const addProblem = (req, res) => {
    try {
        upload(req, res, async (err) => {
            if (err) {
                return res.status(400).json({ message: err });
            }

            try {
                const problem = problemModel({
                    UserID: req.body.UserID,
                    ProblemImage: req.body.ProblemImage,
                    ProblemDescription: req.body.ProblemDescription,
                    ProblemLocation: req.body.ProblemLocation,
                    Status: req.body.Status,
                    UploadTime: req.body.UploadTime
                });

                const problemQuery = await problem.save();

                return res.status(200).json({
                    data: problemQuery,
                    message: "Problem added successfully"
                });
            } catch (error) {npm 
                return res.status(500).json({
                    message: error.message
                });
            }
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
};

const getAllProblem = async (req, res) => {
    try {
        const problemQuery = await problemModel.find();
        return res.status(200).json({
            data: problemQuery,
            message: "Problems fetched successfully"
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

const getProblemById = async (req, res) => {
    // const id = req.params.id;
    const key = req.params.key;
    const value = req.params.value;
    console.log("key", key);
    console.log("value", value);

    console.log("test1")
    try {

        const query = {};
        query[key] = value;

        // console.log("value", value)
        // console.log("key", key)
        // console.log("query", query)

        const problemQuery = await problemModel.find(query);
        if (problemQuery) {
            console.log("test2", problemQuery)

            return res.status(200).json({
                data: problemQuery,
                message: "Problem fetched successfully",
                success: true
            });
        }
        else if (!problemQuery) {
            console.log("test3")

            res.json({
                message: 'Problem not found',
                success: false
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

const updateProblem = async (req, res) => {
    const id = req.params.id;
    console.log("id",id);
    const data = req.body;
    console.log("data",data);

    try {
        if (data.UpdateByAdmin === true && data.Status) {
            await data.Status == "Accepted" ? data.Status = "Accepted" : null
            await data.Status == "Rejected" ? data.Status = "Rejected" : null
            await data.Status == "Unreport" ? data.Status = "Accepted" : null
        }
        delete data.UpdateByAdmin;
        console.log( "data", data);
        
        const updatedProblem = await problemModel.findByIdAndUpdate(id,data);
        console.log("updatedProblem",updatedProblem);
        
        return res.status(200).json({
            data: updatedProblem,
            message: "Problem updated successfully",
            success:true
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};
const getProblemByIdUpdate = async (req, res) => {
    const { id } = req.params;
    console.log("ID received: ", id);
    const data = {
        ProblemDescription: req.body.ProblemDescription,
        ProblemLocation: req.body.ProblemLocation,
        Status: req.body.Status,
        UploadTime: req.body.UploadTime
    };
    console.log("Data to update: ", data);
    try {
        const updatedProblem = await problemModel.findByIdAndUpdate(id, data, { new: true });
        // console.log("Updated problem: ", updatedProblem);
        return res.status(200).json({
            data: updatedProblem,
            message: "Problem updated successfully"
        });
    } catch (err) {
        console.log("Error: ", err);
        return res.status(500).json({
            message: err.message
        });
    }
};

const deleteProblem = async (req, res) => {
    const id = req.params.id;

    try {
        const problem = await problemModel.findById(id);

        if (!problem) {
            return res.status(404).json({
                message: "Problem not found"
            });
        }

        // Delete image from Cloudinary if exists
        if (problem.ProblemImage) {
            await cloudinary.uploader.destroy(problem.ProblemImage);
        }

        // Delete problem from database
        await problemModel.findByIdAndDelete(id);

        return res.status(200).json({
            data: problem,
            message: "Problem deleted successfully"
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    addProblem,
    getAllProblem,
    getProblemById,
    updateProblem,
    getProblemByIdUpdate,
    deleteProblem
};









// const problemModel = require('../models/ProblemModel')
// // const userModel = require('../models/UserModel')
// const multer = require('multer')
// const fs = require('fs');
// const cloudinary = require('cloudinary').v2;

// const storage = multer.diskStorage({
//     destination: './uploads/',
//     filename: function (req, file, cb) {
//         cb(null, file.originalname)
//     }
// })

// const upload = multer({
//     storage: storage,
//     limits: { fileSize: 2000000 }, //infile size 1mb
// }).single("ProblemImage")

// const addProblem = (req, res) => {
//     try {

//         upload(req, res, async (err) => {
//             if (err) {
//                 res.status(400).json({
//                     message: err
//                 })
//             }
//             else {
//                 const problem = problemModel({
//                     // ProblemID: req.body.ProblemID,
//                     // ProblemImage: req.file.path,
//                     ProblemImage: req.file.ProblemImage,
//                     ProblemDescription: req.body.ProblemDescription,
//                     ProblemLocation: req.body.ProblemLocation,
//                     Status: req.body.Status
//                 })
//                 console.log("problem",problem);

//                 const problemQuery = await problem.save();
//                 if (problemQuery) {
//                     res.status(200).json({
//                         data: problemQuery,
//                         message: "problem added successfully"
//                     })
//                 }
//                 else {
//                     res.json({
//                         message: "problem not added"
//                     })
//                 }
//             }
//         })
//     }
//     catch (err) {
//         res.status(500).json({
//             message: err.message
//         })
//     }
// }

// const getAllProblem = async (req, res) => {

//     try {

//         // const problemQuery = await problemModel.find().lean()
//         const problemQuery = await problemModel.find()
//         // const modifiedProblem = problemQuery.map(problem => {
//         //     return {
//         //         ...problem, ProblemID: problem._id, _id: undefined
//         //     }
//         // })
//         // console.log(modifiedProblem)
//         if (problemQuery) {
//             res.status(200).json({
//                 data: problemQuery,
//                 message: "problem fatch sucessfully"
//             })
//         }
//         else {
//             res.json({
//                 message: "problem not found or empty list"
//             })
//         }
//     }
//     catch (err) {
//         res.status(500).json({
//             message: err.message
//         })
//     }
// }

// const getProblemById = async (req, res) => {

//     const id = req.params.id

//     try {

//         // const problemQuery = await problemModel.findById(id).lean()
//         const problemQuery = await problemModel.findById(id)

//         if (problemQuery) {
//             // const modifiedProblem = {

//             //     ...problemQuery, ProblemID: problemQuery._id, _id: undefined
//             // }
//             res.status(200).json({
//                 data: problemQuery,
//                 message: "problem fatch sucessfully"
//             })
//         }
//         else {
//             res.json({
//                 message: "problem not found or empty list"
//             })
//         }
//     }
//     catch (err) {
//         res.status(500).json({
//             message: err.message
//         })
//     }
// }

// const deleteProblem = async (req, res) => {

//     const id = req.params.id

//     try {

//         const problemQuery = await problemModel.findByIdAndDelete(id)

//         if (problemQuery) {

//             const imagePath = problemQuery.ProblemImage;
//             fs.unlinkSync(imagePath);

//             res.status(200).json({
//                 data: problemQuery,
//                 message: "problem deleted successfully"
//             })
//         }
//         else {
//             res.json({
//                 message: "problem not found"
//             })
//         }
//     }
//     catch (err) {
//         res.status(500).json({
//             message: err.message
//         })
//     }
// }
// const updateProblem = async (req, res) => {
//     const id = req.params.id
//     try {
//         upload(req, res, async (err) => {
//             if (err) {
//                 res.status(400).json({
//                     message: err
//                 })
//             }
//             else {
//                 const data = {
//                     ProblemImage: req.file.path,
//                     ProblemDescription: req.body.ProblemDescription,
//                     ProblemLocation: req.body.ProblemLocation,
//                     Status: req.body.Status
//                 }
//                 const problemQuery = await problemModel.findByIdAndUpdate(id, data)
//                 if (problemQuery) {
//                     res.status(200).json({
//                         data: problemQuery,
//                         message: "Problem updated Successfully"
//                     })
//                 }
//                 else {
//                     res.json({
//                         message: "No Data Provided to Update"
//                     })
//                 }
//             }
//         })
//     }
//     catch (err) {
//         res.status(500).json({
//             message: err.message
//         })
//     }
// }

// module.exports = {
//     addProblem,
//     getAllProblem,
//     getProblemById,
//     deleteProblem,
//     updateProblem
// }


// // const cloudinary = require('cloudinary').v2;
// // const problemModel = require('../models/ProblemModel');

// // // Set up Cloudinary
// // cloudinary.config({
// //   cloud_name: process.env.CLOUD_NAME,
// //   api_key: process.env.CLOUD_API_KEY,
// //   api_secret: process.env.CLOUD_API_SECRET
// // });

// // const addProblem = async (req, res) => {
// //   try {
// //     // Upload image to Cloudinary
// //     const result = await cloudinary.uploader.upload(req.file.path);

// //     // Create new problem object with Cloudinary image URL
// //     const problem = new problemModel({
// //       ProblemImage: result.secure_url, // Use the secure URL provided by Cloudinary
// //       ProblemDescription: req.body.ProblemDescription,
// //       ProblemLocation: req.body.ProblemLocation,
// //       Status: req.body.Status
// //     });

// //     // Save the problem to the database
// //     const savedProblem = await problem.save();

// //     res.status(200).json({
// //       data: savedProblem,
// //       message: "Problem added successfully"
// //     });
// //   } catch (err) {
// //     res.status(500).json({
// //       message: err.message
// //     });
// //   }
// // };


// // module.exports = {
// //   addProblem,
// //   // Other functions...
// // };
