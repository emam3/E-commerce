const myMongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")
const userModel = new myMongoose.Schema({
    name: {
        type: String,
        trim: true,
        minlength: 6,
        maxlength: 20,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("invalid email")
            }
        }
    },
    password: {
        type: String,
        trim: true,
        required: true,
    },
    phoneNumber: {
        type: String,
        trim: true,
        validate(value) {
            if (!validator.isMobilePhone(value, ['ar-EG'])) throw new Error("invalid phone number")
        }
    },
    gender: {
        type: String,
        trim: true,
        enum: ["male", "female"]
    },
    age: {
        type: Number,
        min: 18
    },
    card: [{
        something: {
            type: String,
            required: true
        }
    }]
    ,
    broducts: [{
        something: {
            type: String,
            required: true
        }
    }]
    ,
    userType: {
        type: String,
        trim: true,
        required: true,
        enum: ["admin", "seller", "customer"]
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
},
    { timestamps: true }
)

userModel.virtual('myPosts', {
    ref: "Post",
    localField: "_id",
    foreignField: "userId"
})


userModel.pre("save", async function () {
    let user = this
    if (user.isModified("password")) {
        user.password = await bcrypt.hash(user.password, Number(process.env.bcryptCyles))
    }
})


userModel.statics.login = async (emaill, password) => {
    const user = await User.findOne({ email: emaill })
    if (!user) {
        throw new Error("email not found")
    } else {
        const isValidPass = await bcrypt.compare(password, user.password)
        console.log(isValidPass)
        if (!isValidPass) throw new Error("invalid password")
        return user
    }
}


userModel.methods.generateToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id }, process.env.JWTTOKEN)
    user.tokens.push({ token })
    await user.save()
    return token
}

userModel.statics.deleteUser = async (emaill, password) => {
    const user = await User.findOne({ email: emaill }) 
    if (!user) {
        throw new Error("user not found")
    } else {
        await User.deleteOne({ email: emaill })
        return true
    }
}

userModel.statics.addToCard = async (broductID) => {
    const user = await User.findOne({ email: emaill }) 
    if (!user) {
        throw new Error("user not found")
    } else {
        await User.deleteOne({ email: emaill })
        return true
    }
}



const User = myMongoose.model("User", userModel)
module.exports = User