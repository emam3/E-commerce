const jwt = require("jsonwebtoken")
const User = require("../db/models/user.model")
const adminAuth = async (req, res, next) => {
    try {
        const token = req.header("Authorization").replace("Bearer ", "")
        const decodedData = jwt.verify(token, process.env.JWTTOKEN)
        const user = await User.findOne({ _id: decodedData._id })
        if (!user) { // make sure eno user , whatever el type bta3o
            throw new Error('unauthorized')
        } else { // make sure eno admin
            if (user.userType == "admin") {
                next()
            } else {
                throw new Error('only admins')
            }
        }

    }
    catch (e) {
        res.status(500).send({
            apiStatus: false,
            message: "unauthorized",
            data: e.message
        })
    }
}
module.exports = adminAuth