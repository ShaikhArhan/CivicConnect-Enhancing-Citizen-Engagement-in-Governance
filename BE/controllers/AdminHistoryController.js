const adminHistoryModel = require("../models/AdminHistoryModel")

const addAdminHistory =async(req,res)=>{
    const{AdminId,Activity}=req.body
    try {       
        if(Activity==="Login") {

        }else if(Activity==="varifyProblem"){
            if(varifyActivity==="UnseenProblem"){

            }else if(varifyActivity==="AcceptProblem"){

            }else if(varifyActivity==="RejectProblem"){

            }else if(varifyActivity==="ReportProblem"){

            }else if(varifyActivity==="DeleteProblem"){

            }else if(varifyActivity==="UnSolvedProblem"){

            }else if(varifyActivity==="SolvedProblem"){

            }
        }else if(Activity==="AdminControll"){
            if(AdminActivity==="RegistrationAdmin"){

            }else if(AdminActivity==="UpdateAdmin"){

            }else if(AdminActivity==="DeleteAdmin"){

            }
        }


        
    } catch (error) {
        res.json({
            message:"error in posting history",
            success:false
        })
    }
}

module.exports={
    addAdminHistory
}