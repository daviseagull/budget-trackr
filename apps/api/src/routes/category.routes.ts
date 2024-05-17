import { Router } from 'express'
import { categoryController } from '../controllers/category.controller'

const categoryRoutes = Router()

categoryRoutes.post('/', categoryController.create)
categoryRoutes.get('/', categoryController.getByType)
categoryRoutes.get('/:id', categoryController.getById)

export default categoryRoutes
