import express from 'express'
const router = express.Router()
import { registerUser, loginUser, getUser } from '../controllers/userController'
import { protect } from '../middleware/authMiddleware'

router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/me',protect, getUser)

module.exports = router