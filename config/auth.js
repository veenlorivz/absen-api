require('dotenv').config()

module.exports = {
    secretCode: process.env.AUTH_SECRET_CODE,
    algorithm: process.env.AUTH_ALGORITHM
}