import { Router } from 'express'
import { accountTransactionController } from '../controllers/account-transaction.controller'

const accountTransactionRoutes = Router()

accountTransactionRoutes.get('/', accountTransactionController.getByFilters)
accountTransactionRoutes.get('/:id', accountTransactionController.getById)
accountTransactionRoutes.post('/', accountTransactionController.create)

export default accountTransactionRoutes
