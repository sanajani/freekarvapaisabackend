import mongoose from "mongoose";

const userPhoneNumberSchema = new mongoose.Schema({
    phoneNumber:{
        type:String,
        required: true,
        unique: true
    }
})
const userPhoneNumberModel = mongoose.model("UserPhoneNumbers",userPhoneNumberSchema)
export default userPhoneNumberModel