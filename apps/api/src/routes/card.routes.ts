import { Router } from 'express'
import { cardController } from '../controllers/card.controller'

const cardRoutes = Router()

cardRoutes.post('/', cardController.create)
cardRoutes.get('/', cardController.getAll)
cardRoutes.get('/:id', cardController.getById)

export default cardRoutes
