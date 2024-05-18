import { Router } from 'express'
import { authenticate } from '../middlewares/authenticate.middleware'
import accountRoutes from './account.routes'
import authRoutes from './auth.routes'
import cardRoutes from './card.routes'
import categoryRoutes from './category.routes'
import userRoutes from './user.routes'

const routes = Router()

routes.use('/api/auth', authRoutes)
routes.use('/api/v1/users', userRoutes)
routes.use('/api/v1/accounts', authenticate, accountRoutes)
routes.use('/api/v1/categories', authenticate, categoryRoutes)
routes.use('/api/v1/cards', authenticate, cardRoutes)

export default routes
