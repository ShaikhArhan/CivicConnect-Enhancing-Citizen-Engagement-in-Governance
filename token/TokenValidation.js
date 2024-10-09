const jwt = require('jsonwebtoken');

const secret = 'as8340453';

const generateToken = (payload) => {
    try {

        const encodedToken = jwt.sign(payload, secret, {
            expiresIn: "30 days",
            algorithm: 'HS512'
        });
        console.log("generateToken:",encodedToken)

        return encodedToken;

    } catch (err) {
        console.log("TokenValidation-generateToken " + err);
    }
};
const validateToken = (token) => {
    try {
        const decodedToken = jwt.verify(token, secret);
        return decodedToken;

    } catch (err) {
        console.log("TokenValidation-validateToken " + err);
        return undefined
    }
};

module.exports = {
    generateToken,
    validateToken
}