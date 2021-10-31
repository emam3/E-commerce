const BroductM = require("../db/models/broduct.model")
const jwt = require("jsonwebtoken")

class Broduct {
    static addBroduct = async (req, res) => {
        try {
            const token = req.headers.authorization
            const getUserID = jwt.verify(token, process.env.JWTTOKEN) // getting ID of seller
            const broduct = new BroductM({
                userId: getUserID._id,
                ...req.body
            })
            await broduct.save()
            res.send("broduct")
        }
        catch (e) {
            res.status(500).send({
                apiStatus: false,
                data: e.message,
                message: "error adding broduct"
            })
        }
    }

    static deleteBroductModel = async (req, res) => {
        try {
            const token = req.headers.authorization
            const getUserID = jwt.verify(token, process.env.JWTTOKEN) // getting ID of seller
            BroductM.deleteBroduct(req.body.broductID , getUserID._id)
            res.status(500).send({
                apiStatus: false,
                data: e.message,
                message: "broduct deleted"
            })
        }
        catch (e) {
            res.status(500).send({
                apiStatus: false,
                data: e.message,
                message: "error deleteing broduct"
            })
        }
    }
}

module.exports = Broduct