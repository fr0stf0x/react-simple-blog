import { Router } from 'express'
import controllers from './tag.controllers'

const router = Router()

// /api/tag
router
  .route('/')
  .get(controllers.getAll)
  .post(controllers.createOne)

// /api/tag/:id
router
  .route('/:id')
  .get(controllers.getOne)
  .put(controllers.updateOne)
  .delete(controllers.removeOne)

export default router
