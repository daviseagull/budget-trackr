import { Router } from 'express'
import { authenticate } from '../middlewares/authenticate.middleware'
import accountTransactionRoutes from './account-transaction.routes'
import accountRoutes from './account.routes'
import authRoutes from './auth.routes'
import cardRoutes from './card.routes'
import categoryRoutes from './category.routes'
import transferRoutes from './transfer.routes'
import userRoutes from './user.routes'

const routes = Router()

routes.use('/api/auth', authRoutes)
routes.use('/api/v1/users', userRoutes)
routes.use('/api/v1/accounts', authenticate, accountRoutes)
routes.use('/api/v1/categories', authenticate, categoryRoutes)
routes.use('/api/v1/cards', authenticate, cardRoutes)
routes.use('/api/v1/transfers', authenticate, transferRoutes)
routes.use(
  '/api/v1/account-transactions',
  authenticate,
  accountTransactionRoutes
)

export default routes
