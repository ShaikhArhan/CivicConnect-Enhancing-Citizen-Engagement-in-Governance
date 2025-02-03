const { type } = require("express/lib/response")
const mongoose = require("mongoose")
const Schema = mongoose.Schema
const adminHistorySchema = new Schema({
    AdminId: {
        type: Schema.Types.ObjectId,
        ref: "Admin",
        required: true
    },
    Timestamp: {
        type: Date, default: Date.now
    },
    Activity: {
        type: String,
        required: true
    },
    HistoryData: {
        Login: {
            UserName: {
                type: String,
                required: true
            }
        },
        varifyProblem: {
            varifyActivity: {
                type: String,
                required: true
            },
            oldData: {
                ProblemID: {
                    type: Schema.Types.ObjectId,
                    default: generateObjectId,
                },
                UserID: {
                    type: Schema.Types.ObjectId,
                    ref: "User"
                },
                ProblemImage: {
                    type: String,
                    required: true
                },
                ProblemDescription: {
                    type: String,
                    required: true
                },
                ProblemLocation: {
                    type: String,
                    required: true
                },
                Status: {
                    type: Array,
                    required: true

                },
                UploadTime: {
                    type: Date,
                    required: true
                }
            },
            newData: {
                ProblemID: {
                    type: Schema.Types.ObjectId,
                    default: generateObjectId,
                },
                UserID: {
                    type: Schema.Types.ObjectId,
                    ref: "User"
                },
                ProblemImage: {
                    type: String,
                    required: true
                },
                ProblemDescription: {
                    type: String,
                    required: true
                },
                ProblemLocation: {
                    type: String,
                    required: true
                },
                Status: {
                    type: Array,
                    required: true

                },
                UploadTime: {
                    type: Date,
                    required: true
                }
            }
        },
        AdminControll: {
            AdminActivity: {
                type: String,
                required: true
            },
            Registration: {
                AdminName: {
                    type: String,
                    required: true
                },
                AdminPhoneNo: {
                    type: String,
                    required: true
                },
                AdminUserName: {
                    type: String,
                    required: true
                },
                AdminPassword: {
                    type: String,
                    required: true
                },
                AdminAddress: {
                    type: String,
                    required: true
                },
                AdminRole: {
                    type: [String],
                    required: true
                }
            },
            Update: {
                oldData: {
                    AdminName: {
                        type: String,
                        required: true
                    },
                    AdminPhoneNo: {
                        type: String,
                        required: true
                    },
                    AdminUserName: {
                        type: String,
                        required: true
                    },
                    AdminPassword: {
                        type: String,
                        required: true
                    },
                    AdminAddress: {
                        type: String,
                        required: true
                    },
                    AdminRole: {
                        type: [String],
                        required: true
                    }
                },
                newData: {
                    AdminName: {
                        type: String,
                        required: true
                    },
                    AdminPhoneNo: {
                        type: String,
                        required: true
                    },
                    AdminUserName: {
                        type: String,
                        required: true
                    },
                    AdminPassword: {
                        type: String,
                        required: true
                    },
                    AdminAddress: {
                        type: String,
                        required: true
                    },
                    AdminRole: {
                        type: [String],
                        required: true
                    }
                }
            },
            Delete: {
                AdminName: {
                    type: String,
                    required: true
                },
                AdminPhoneNo: {
                    type: String,
                    required: true
                },
                AdminUserName: {
                    type: String,
                    required: true
                },
                AdminPassword: {
                    type: String,
                    required: true
                },
                AdminAddress: {
                    type: String,
                    required: true
                },
                AdminRole: {
                    type: [String],
                    required: true
                }
            }
        }
    }
})
module.exports = mongoose.model("adminHistory", adminHistorySchema)