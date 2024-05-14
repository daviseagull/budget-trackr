import { Router } from 'express'
import { userController } from '../controllers/user.controller'

const userRoutes = Router()

userRoutes.post('/', userController.create)

export default userRoutes
