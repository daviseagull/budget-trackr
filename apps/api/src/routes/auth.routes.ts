import { Router } from 'express'
import { authController } from '../controllers/auth.controller'

const authRoutes = Router()

authRoutes.post('/sign-in', authController.signIn)
authRoutes.post('/sign-up', authController.signUp)

export default authRoutes
