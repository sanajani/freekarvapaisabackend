import mongoose from 'mongoose'

const userAdminSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    lastName:{
        type:String,
        required: true
    },
    companyName:{
        type:String,
        required: true
    },
    phoneNumber:{
        type:String,
    }
})

const userAdminModel = mongoose.model("userAdmin",userAdminSchema);

export default userAdminModel
