import { Router } from 'express'
import { authController } from '../controllers/auth.controller'
import { authenticate } from '../middlewares/autentication.middleware'

const authRoutes = Router()

authRoutes.post('/sign-in', authController.signIn)
authRoutes.post('/sign-out', authenticate, authController.signOut)

export default authRoutes
