const User = require("../db/models/user.model")
const BroductM = require("../db/models/broduct.model")

class UserController {
    static register = async (req, res) => {
        try {
            let user = new User(req.body)
            await user.save()
            res.send({ apiStatus: true, message: "registered", data: user })
        }
        catch (e) {
            res.status(500).send({
                apiStatus: false,
                data: e.message,
                message: "error in adding user"
            })
        }
    }


    static login = async (req, res) => {
        try {
            const userData = await User.login(req.body.email, req.body.password)
            const token = await userData.generateToken()
            userData.tokens.push(token)
            res.status(200).send({ apiStatus: true, data: { userData, token }, message: "logged in success" })
        }
        catch (e) {
            res.status(500).send({ apiStatus: false, data: e.message, message: "invalid login" })
        }
    }

    static profile = async (req, res) => {
        res.status(200).send({
            apiStatus: true,
            data: req.user,
            message: "user data loaded"
        })
    }

    static deleteUserController = async function (req, res) {  //delete user
        try {
            const userData = await User.deleteUser(req.body.email)
            res.status(200).send({
                messege: `user deleted`
            })
        } catch (e) {
            res.status(500).send({
                messege: `user isnt deleted`
            })
        }
    }

    static logout = async function (req, res) {
        try {
            req.user.tokens = []
            await req.user.save()
            res.status(200).send({
                messege: "user logged out"
            })
        } catch (e) {
            res.status(500).send({
                messege: "user didnt logout"
            })
        }
    }

    //addToCard
    static addToCard = async function (req, res) {  //delete user
        try {
            const checkBroduct = BroductM.findOne({ _id: req.body.broductID })
            
            if (!checkBroduct) {
                throw new Error("broduct doesnt exist")
            } else {
                const id = req.broductID
                await User.card.push({ id })
                res.status(200).send({
                    messege: "broduct added to your card"
                })
            }

        } catch (e) {
            res.status(500).send({
                messege: "couldnt add the broduct"
            })
        }
    }
}

module.exports = UserController