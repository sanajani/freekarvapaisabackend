import express from 'express'
import {userPhoneNumberOTP} from '../controllers/user.phonenumber.controller.js'
const router = express.Router();
// /api/v1/otp/phone
router.post('/phone', userPhoneNumberOTP)

export default router