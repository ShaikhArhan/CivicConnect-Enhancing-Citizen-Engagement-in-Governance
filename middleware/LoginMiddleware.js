const TokenValidation = require('../token/TokenValidation')
const userModel = require("../models/UserModel")

const authMiddleware =async (req, res, next) => {

    const token = req.headers.authorization
    if (token && token.startsWith("Bearer ")) {

        const tokenData = token.split(" ")[1]
        const user = TokenValidation.validateToken(tokenData)
        const userPresent = await userModel.findById(user._id)
        if (user != undefined && userPresent) {
            next()
        }
        else {
            res.status(403).json({
                message: 'Invalid or expired token'
            })
        }
    }
    else {
        res.status(401).json({
            message: "Invalid token"
        })
    }

}
module.exports = {
    authMiddleware
}

// eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjlmZDJiZmMyOTI5NzMzNmNjYmEwNWUiLCJVc2VyTmFtZSI6IlNoYWlraCBBcmhhbiAiLCJVc2VyUGhvbmVObyI6Iis5MTkzMjc1MDEwMzQiLCJVc2VySUQiOiI2NjlmZDJiZmMyOTI5NzMzNmNjYmEwNWYiLCJSb2xlIjoiNjVlNDljMjg3NjRhODE1ZDk2YWQwNDQxIiwiX192IjowLCJpYXQiOjE3MjI4NDE4NDMsImV4cCI6MTcyNTQzMzg0M30.f_KnnC7VtatklROsEa-Ag8QF0lk6axckkrF7Vq-3TdCAvl2NZSWwJlHZW-GkNFKdpzOoN0ZV1WHJhk5SrOMctA

// eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmFiYTY5OGI2NTBlZTFlOWRkZGYwMTAiLCJBZG1pbk5hbWUiOiJTaGFpa2ggQXJoYW4iLCJBZG1pblBob25lTm8iOjkxOTMyNzUwMTAzNCwiQWRtaW5Vc2VyTmFtZSI6IlNBOTMzNCIsIkFkbWluUGFzc3dvcmQiOiJhczc3IiwiQWRtaW5BZGRyZXNzIjoibm9uZSIsIkFkbWluSUQiOiI2NmFiYTY5OGI2NTBlZTFlOWRkZGYwMTEiLCJfX3YiOjAsImlhdCI6MTcyMjg0MzIzNywiZXhwIjoxNzI1NDM1MjM3fQ.JWcOgjm2-h3oy9L-xThNdnESLtqTzgVivZvPThVGjg2mo5eDZUvZwQKDPXMYz62XdItpWaUxrni3SvB1KkXJLg
