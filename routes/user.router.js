import express from 'express'

import { createUser,getAllUsers,getUserByIDAndUpdate,getUserById} from '../controllers/user.controller.js';
import { checkJWT } from '../utils/validToken.js';
const router = express.Router();

// /api/v1/user/signup
router.post('/signup',createUser)

// /api/v1/user
router.put('/:id',checkJWT,getUserByIDAndUpdate)

// /api/v1/user/users
router.get('/users',getAllUsers)

// /api/v1/user/:id
router.get('/:id',getUserById)

export default router