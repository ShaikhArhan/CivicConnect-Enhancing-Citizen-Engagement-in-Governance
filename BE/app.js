const express = require('express')
const app = express()
const mongoose = require('mongoose')
const path = require('path');
const cors = require('cors')
const bodyParser = require('body-parser')
const { urlencoded } = require('body-parser')


app.use(express.json())
app.use(cors({
    origin: ["http://localhost:3000"],
    credentials: true,
    optionsSuccessStatus: 200
}))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use((req,res,next)=>{
//     res.setHead er("Access-Control-Allow-Origin","*");
//     next();
// })

// app.use(bodyParser.urlencoded({ extended: false }))

const roleRoutes = require('./routes/RoleRoutes')
const userRoutes = require('./routes/UserRoutes')
const adminRoutes = require('./routes/AdminRouters')
const problemRoutes = require('./routes/ProblemRoutes')
const otpRoutes = require('./routes/OtpRouters') 
const loginRouters = require("./routes/LoginRouters")
const tokenRouters = require('./routes/TokenRouters')

app.use('/role', roleRoutes)
app.use('/user', userRoutes)
app.use('/admin', adminRoutes)
app.use('/problem', problemRoutes)
app.use('/otp', otpRoutes)
app.use('/auth', loginRouters)
app.use('/token', tokenRouters)

// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));  // this will send image to frontend


mongoose.connect("mongodb://127.0.0.1:27017/ciogr", {
    // useNewUrlParser:true, 
    // useUnifiedTopology:true
}).then(() => {
    console.log("connected")
}).catch(() => {
    console.log("not connected")
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})