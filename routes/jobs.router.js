import express from 'express'
import { createJob, getAllJobs, getJobByIdAndDelete, getSingleJobAndShowToUser } from '../controllers/job.controller.js';

const router = express.Router();

// CREATE POST /api/v1/job
router.post('/',createJob)

// GET ALL JOBS /api/v1/job
router.get('/',getAllJobs)

// GET SINGLE JOB /api/v1/job:id
// router.get('/:id',getAllJobs)
// getSingleJobAndShowToUser

// GET SINGLE JOB /api/v1/job/show/:id
router.get('/show/:id',getSingleJobAndShowToUser)

//DELETE /api/v1/job:id
router.delete('/:id',getJobByIdAndDelete)



export default router