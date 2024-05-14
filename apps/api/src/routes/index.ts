import { Router } from 'express'
import authRoutes from './auth.routes'
import userRoutes from './user.routes'

const routes = Router()

routes.use('/api/v1/users', userRoutes)
routes.use('/api/auth', authRoutes)

export default routes
