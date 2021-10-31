const Mailer = require('nodemailer')

const stmp = {
    service: 'gmail',
    auth: {
        user: "nouremam@gmail.com",
        pass: ""
    }
}

const sendRegisterationEmail = (reciver , body) => {
    try {
        const transporter = Mailer.createTransport(stmp)
        transporter.sendMail({
            from: "test",
            to: reciver ,
            subject: "Registration done",
            text: body
        }) 
    }
    catch (e) {
        console.log(e)
    }
}

module.exports = sendRegisterationEmail