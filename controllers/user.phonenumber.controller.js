import jwt from 'jsonwebtoken'
const JWT_SECRETKEY = process.env.JWT_SECRETKEY
import userAdminModel from '../models/user.admin.model.js'

import CustomError from '../utils/CustomError.js'
import userPhoneNumberModel from '../models/user.phonenumber.model.js'
import userModel from '../models/userModel.js'

export const userPhoneNumberOTP = async (req, res, next) => {
  console.log('hello world');
  const { phoneNumber } = req.body
  try {
    const registeredPhoneNumber = await userModel.findOne({ phoneNumber })
    const registeredAdminPhoneNumber = await userAdminModel.findOne({ phoneNumber })
    const userPhoneNumber = await userPhoneNumberModel.findOne({ phoneNumber })
    if(registeredAdminPhoneNumber && registeredPhoneNumber){
      const userToken = jwt.sign(
        { _id: userPhoneNumber._id, phoneNumber: userPhoneNumber.phoneNumber },
        JWT_SECRETKEY,
        {
          expiresIn: 60 * 60 * 24 * 30
        }
      )
      const adminToken = jwt.sign(
        { _id: userPhoneNumber._id, phoneNumber: userPhoneNumber.phoneNumber },
        JWT_SECRETKEY,
        {
          expiresIn: 60 * 60 * 24 * 30
        }
      )
      return res
        .status(200)
        .json({
          isUser: true,
          success: true,
          data: registeredPhoneNumber,
          userToken,
          adminToken
        })
    }else if(registeredAdminPhoneNumber){
      const adminToken = jwt.sign(
        { _id: userPhoneNumber._id, phoneNumber: userPhoneNumber.phoneNumber },
        JWT_SECRETKEY,
        {
          expiresIn: 60 * 60 * 24 * 30
        }
      )
      return res
        .status(200)
        .json({
          isUser: true,
          success: true,
          data: registeredPhoneNumber,
          adminToken
        })
    }
   else if (registeredPhoneNumber) {
      const userToken = jwt.sign(
        { _id: userPhoneNumber._id, phoneNumber: userPhoneNumber.phoneNumber },
        JWT_SECRETKEY,
        {
          expiresIn: 60 * 60 * 24 * 30
        }
      )
      return res
        .status(200)
        .json({
          isUser: true,
          success: true,
          data: registeredPhoneNumber,
          userToken
        })
    } else if (userPhoneNumber) {
      return res
        .status(201)
        .json({ success: true, message: 'User Exist Before' })
    } else {
      const newUserWithPhoneNumberOTP = userPhoneNumberModel({
        phoneNumber
      })
      const savedPhoneNumberOTP = await newUserWithPhoneNumberOTP.save()
      return res
        .status(200)
        .json({
          message: 'user Alrady exist',
          success: true,
          data: savedPhoneNumberOTP
        })
    }
  } catch (error) {
    next(new CustomError(error.message, error.statusCode))
  }
}
