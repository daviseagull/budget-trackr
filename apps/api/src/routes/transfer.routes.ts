import { Router } from 'express'
import { transferController } from '../controllers/transfer.controller'

const transferRoutes = Router()

transferRoutes.post('/', transferController.create)
transferRoutes.get('/', transferController.getByFilters)

export default transferRoutes
