const jwt = require("jsonwebtoken")
const User = require("../db/models/user.model")
const userAuth = async (req, res, next) => {
    try {
        const token = req.header("Authorization").replace("Bearer ", "")
        const decodedData = jwt.verify(token, process.env.JWTTOKEN)
        const user = await User.findOne({ _id: decodedData._id })
        if (!user) { // make sure eno user , whatever el type bta3o
            throw new Error("unauthorized")
        } else { // he logged in
            next()
        }

    }
    catch (e) {
        res.status(500).send({
            apiStatus: false,
            message: "you should login",
            data: e.message
        })
    }
}
module.exports = userAuth