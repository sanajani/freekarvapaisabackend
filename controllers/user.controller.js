import dotenv from 'dotenv'
dotenv.config();

import userModel from '../models/userModel.js'
import bcryptjs from 'bcryptjs'
import CustomError from '../utils/CustomError.js'
import jwt from 'jsonwebtoken'
import userPhoneNumberModel from '../models/user.phonenumber.model.js'
const JWT_SECRETKEY = process.env.JWT_SECRETKEY

// // Signup or Create Worker Account
export const createUser = async (req,res,next) => {
    const {
        currentLocation,
        phoneNumber,
        name,
        email,
        password,
        profileImageURL,
        city,
        currentcity,
        userInformation,
        lastName,
        job,
        phoneNumber1,
        phoneNumber2,
        genderOfWorker,
        educationLevel,
        jobExp,
        typeOfJob,
        currentJob
    } = req.body;
    if(!name || !password || !job || !phoneNumber1 || !city || !userInformation) return next(new CustomError("All the fields are required",403))

    try {
        const getUserWithPhoneNumber = await userPhoneNumberModel.findOne({phoneNumber:phoneNumber})

        const hashPassword = bcryptjs.hashSync(password, 12)
        const newUser = userModel({
            phoneNumber,
            name,
            email,
            password: hashPassword,
            profileImageURL,
            city,
            currentcity,
            userInformation,
            lastName,
            job,
            phoneNumber1,
            phoneNumber2,
            genderOfWorker,
            educationLevel,
            jobExp,
            typeOfJob,
            currentJob,
            currentLocation
        })
        await newUser.save();
        newUser.password = ''
        const token = jwt.sign({_id:getUserWithPhoneNumber._id,phoneNumber: getUserWithPhoneNumber.phoneNumber},JWT_SECRETKEY,{
            expiresIn: 60 * 60 * 24 * 30
        })
        return res.status(200).json({message:"user created Successfully", success: true, data:newUser,userToken:token})
    } catch (error) {
        next(new CustomError(error.message, error.statusCode))
    }
}

export const getAllUsers = async (req,res,next) => {
    console.log('hello world this is just ');
    const page = parseInt(req?.query?.page) || 1
    const limit = parseInt(req?.query?.limit) || 8
    const job = req?.query?.job || false;
    const city = req?.query?.province || false;
    try {
        let query = {}
        // if(job !== 'null' && city !== 'null'){
        if(job && city){
            query = {job:new RegExp(`^${job}`), city}
        }else if(job){
            query = {job : new RegExp(`^${job}`)}
        }else if(city){
            query = {city}
        }else{
            query = {}
        }
        const getAllUser = await userModel
        .find(query)
        .skip((page - 1) * limit).limit(limit)
        .exec();

        const count = await userModel.countDocuments(query)
        const totalPages = Math.floor((count + limit - 1) / limit);
        console.log(totalPages);
        return res.status(200).json({message:"user created Successfully", success: true, totalPages, data:getAllUser})
    } catch (error) {
        next(new CustomError(error.message,error.statusCode))
    }
}

export const getUserById = async (req,res,next) => {
    const {id} = req.params
    try {
        const getUser = await userModel.findById({_id:id});
        if(!getUser) return res.status(400).json({message:'user dose not exist',success:false})

        return res.status(200).json({message:"user created Successfully", success: true, data:getUser})
    } catch (error) {
        next(new CustomError(error.message,error.statusCode))
    }
}

export const getUserByIDAndUpdate = async (req,res,next) => {
    const id = req.params.id;
    const updateData = req.body;
    try {
      const updatedUser = await userModel.findByIdAndUpdate(
         id ,updateData, {new:true}
      );

      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }

      return res.status(200).json({message:"User Updated Successfully", success: true, data:updatedUser})

    } catch (error) {
        next(new CustomError(error.message,error.statusCode))
    }
}
