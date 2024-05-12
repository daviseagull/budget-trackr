import { Router } from 'express'
import { authController } from '../controllers/auth.controller'

const authRoutes = Router()

authRoutes.post('/sign-in', authController.signIn)

export default authRoutes
