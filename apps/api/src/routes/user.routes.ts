import { Router } from 'express'
import { userController } from '../controllers/user.controller'
import { authenticate } from '../middlewares/authenticate.middleware'

const userRoutes = Router()

userRoutes.post('/', userController.create)
userRoutes.get('/', authenticate, userController.get)

export default userRoutes
