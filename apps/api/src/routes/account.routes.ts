import { Router } from 'express'
import { accountController } from '../controllers/account.controller'

const accountRoutes = Router()

accountRoutes.post('/', accountController.create)
accountRoutes.get('/', accountController.getAll)
accountRoutes.get('/:id', accountController.getOne)

export default accountRoutes
