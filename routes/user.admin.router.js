import express from 'express'
import { createUserAdmin, getAllJobsPostedByThisAdmin,getJobByIdAndUpdate } from '../controllers/user.admin.controller.js';

const router = express.Router();

// /api/v1/user/admin
router.post('/',createUserAdmin)

// /api/v1/user/admin/jobs
router.get('/jobs/:phonenumber',getAllJobsPostedByThisAdmin)

// /api/v1/user/admin/jobs
router.put('/jobs/:id',getJobByIdAndUpdate)



export default router