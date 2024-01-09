import userAdminModel from "../models/user.admin.model.js";
import CustomError from "../utils/CustomError.js";
import userPhoneNumberModel from "../models/user.phonenumber.model.js";
import jwt from 'jsonwebtoken'
import jobModel from '../models/jobs.model.js'

const JWT_SECRETKEY = process.env.JWT_SECRETKEY

export const createUserAdmin = async (req,res,next) => {

    const { name, lastName, companyName, phoneNumber } = req.body;

    if(!name || !lastName || !companyName) return next(new CustomError("لطفا درست خانه پوری کنید",403))
    
    try {
        // get phone number for adding to token
        const getUserWithPhoneNumber = await userPhoneNumberModel.findOne({phoneNumber:phoneNumber})
        // save admin information inseid database
        const newUserAdmin = userAdminModel({
            name,
            lastName,
            companyName,
            phoneNumber
        })
        await newUserAdmin.save();
        // token added on response
        const token = jwt.sign({_id:getUserWithPhoneNumber._id,phoneNumber: getUserWithPhoneNumber.phoneNumber},JWT_SECRETKEY,{
            expiresIn: 60 * 60 * 24 * 30
        })
        return res.status(200).json({message:"شما الان میتوانید وظیفه پوست کنید", success: true, data:newUserAdmin,adminToken:token})
    } catch (error) {
        next(new CustomError(error.message, error.statusCode))
    }
}

export const getAllJobsPostedByThisAdmin = async (req,res,next) => {
    const phoneNumber = req.params.phonenumber;
    try {
        const jobs = await jobModel.find({phoneNumber})
        if(!jobs) return res.status(500).json({message:"error"})
        return res.status(200).json({message:"لیستی از وظایف پوست شده توسط شما", success: true, data:jobs})
    } catch (error) {
        next(new CustomError(error.message, error.statusCode))
    }   
}

export const getJobByIdAndUpdate = async (req,res,next) => {
    const id = req.params.id
    const updatedForm = req.body
    try {
        const updatedJobPost = await jobModel.findByIdAndUpdate(id,updatedForm,{new:true})
        if(!updatedJobPost) return res.status(500).json({success:false,message:"Something went wrong"})
        return res.status(200).json({message:"موفقانه ره روز رسانی شد", success: true, data:updatedJobPost})
    } catch (error) {
        next(new CustomError(error.message,error.statusCode))
    }
}