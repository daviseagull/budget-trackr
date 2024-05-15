import { Router } from 'express'
import { authenticate } from '../middlewares/authenticate.middleware'
import accountRoutes from './account.routes'
import authRoutes from './auth.routes'
import userRoutes from './user.routes'

const routes = Router()

routes.use('/api/auth', authRoutes)
routes.use('/api/v1/users', userRoutes)
routes.use('/api/v1/accounts', authenticate, accountRoutes)

export default routes
