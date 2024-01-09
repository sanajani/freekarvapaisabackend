// import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import DB_CONNECTION from './db/db.connect.js';
DB_CONNECTION();
import cors from 'cors'
import contactRouter from './routes/contact.router.js';
import bodyParser from 'body-parser';

import userAdminRouter from './routes/user.admin.router.js'
import userRouter from './routes/user.router.js'
import { globalErrorHandler } from './controllers/error.controller.js';
import otpPhoneNumberRouter from './routes/user.phonenumber.js';
import jobRouter from './routes/jobs.router.js'

const app = express();
app.use(express.json());
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 9808;

app.listen(PORT,() => {
    console.log(`http://localhost:${PORT}`);
})


app.use('/api/v1/user',userRouter)
app.use('/api/v1/mail',contactRouter)
app.use('/api/v1/otp',otpPhoneNumberRouter)
app.use('/api/v1/job',jobRouter)
app.use('/api/v1/user/admin',userAdminRouter)


// global page not found
app.all("*",(req,res,next) => {
  const error = new Error(`Can't find ${req.originalUrl} on the server`);
  error.status = 'fail'
  error.statusCode = 404
  next(error)
})

// Error handling middleware
app.use(globalErrorHandler);