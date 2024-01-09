import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    phoneNumber:{
        type:String,
        required:[true, "Name field is required"]
    },
    name:{
        type:String,
        required:[true, "Name field is required"]
    },
    email:{
        type:String,
        // required:[true, "Email field is required"],
        unique: [true, "Email field should be unique"]
    },
    password:{
        type:String,
        required:[true, "Password field is required"],
    },
    isAdmin:{
        type: Boolean,
        default: false
    },
    isWorker:{
        type: Boolean,
        default: true
    },
    profileImageURL:{
        type:String
    },
    city:{
        type:String,
        required: true
    },
    currentLocation:{
        type:String,
        required: true
    },
    userInformation:{
        type:String,
        required: true
    },
    lastName:{
        type:String,
        required: true
    },
    job:{
        type:String,
        required: true
    },
    phoneNumber1:{
        type:String,
        required: true
    },
    phoneNumber2:{
        type:String,
    },genderOfWorker:{
        type: String,
    },educationLevel:{
        type: String,
    },jobExp:{
        type: String,
    },typeOfJob:{
        type: []
    },currentJob:{
        type: String
    }
})

const userModel = mongoose.model("users",userSchema)
export default userModel