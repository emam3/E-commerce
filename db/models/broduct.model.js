const myMongoose = require("mongoose")

const broductModule = myMongoose.Schema({
    userId: {
        type: myMongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    name: {
        type: String,
        required: true
    },
    discription: {
        type: String,
        required: true
    }
})

broductModule.statics.deleteBroduct = async (broductID, userIDD) => {
    try {
        const chosenBroduct = await BroductM.findOne({ _id: "617e2a66ad5713c58793384a" })
        if (!chosenBroduct) {
            throw new Error("Broduct doesnt exist")
        } else {
            if (chosenBroduct.userId == userIDD) {
                await BroductM.deleteOne({_id:broductID})
                console.log("oooooooooooooooookkkkkkkkkkkkkkkkk")
            } else {
                throw new Error("youre not the seller")
            }
        }
    }   catch(e) {
        console.log(e.message)
    } 
}


const BroductM = myMongoose.model("broducts", broductModule)
module.exports = BroductM