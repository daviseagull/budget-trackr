import { Router } from 'express'
import { transferController } from '../controllers/transfer.controller'

const transferRoutes = Router()

transferRoutes.post('/', transferController.create)

export default transferRoutes
