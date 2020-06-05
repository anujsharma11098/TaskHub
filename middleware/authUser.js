if (process.env.NODE_ENV !== 'production') require('dotenv').config()
const jwt = require('jsonwebtoken')

module.exports = async (req, res, next) => {
    const token = req.headers.authorization
    if (!token) return res.status(401).json({ status: 401, message: 'Must send Authorization token' })
    try {
        const result = await jwt.verify(token, process.env.JWT_SECRET)
        req.user = JSON.parse(result.data)

    } catch (err) {
        return res.status(401).json({ status: 401, message: 'Admin Unauthorised' })
    }
    next()
}